const express = require('express');
const User = require('../models/User');
const ID = require('../models/ID');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv');

dotenv.config();

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('collegeID', 'Enter a valid College ID').isAlphanumeric(),
    body('branch', 'Enter a valid Branch').isAlpha().isLength({ min: 1 }),
    body('year', 'Enter a valid Year').isString(),
    body('semester', 'Enter a valid Semester').isString(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('metamaskAcc', 'Hash must be a string').isString(),
], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        console.log(errors);
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ collegeID: req.body.collegeID });
        if (user) {
            success = false
            return res.status(400).json({ error: "Sorry a user with this collegeID already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            collegeID: req.body.collegeID,
            branch: req.body.branch,
            year: req.body.year,
            semester: req.body.semester,
            password: secPass,
            metamaskAcc: req.body.metamaskAcc,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login', [
    body('collegeID', 'Enter a valid College ID').isAlphanumeric(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { collegeID, password } = req.body;
    try {
        let user = await User.findOne({ collegeID });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let success = false;
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            success = false;
            return res.status(400).json({ error: "User not Found" });
        }
        success = true
        res.send({ success, user })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Verify a User's Metamask account using: POST "/api/auth/verify". login required

router.post('/verify', fetchuser, async (req, res) => {
    try {
        let success = false;
        let { metamaskAcc } = req.body;
        let userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            success = false;
            return res.status(400).json({ error: "User not Found" });
        }
        if (user.metamaskAcc !== metamaskAcc) {
            success = false
            return res.status(400).json({ success, error: "Unrecognised Metamask account" });
        }
        success = true
        res.send({ success })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 5: Send user a OTP: POST "/api/auth/otp". no login required

router.post('/otp', async (req, res) => {
    try {
        let success = false;
        let sent = false;
        let { collegeID } = req.body;
        let OTP = Math.floor(Math.random() * 1000000);
        let id = await ID.findOne({ collegeID: collegeID });
        if (!id) {
            success = false
            return res.status(400).json({ success, error: "Sorry a user with this collegeID doesn't exist" })
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.USER,
            to: id.email,
            subject: 'BlockVote OTP',
            text: `Your OTP is ${OTP}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (!error) {
                sent = true;
            }
        });

        OTP = OTP.toString();
        success = true;
        res.send({ success, OTP, sent });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 6: Push College ID with email on database: POST "/api/auth/createid". no login required

router.post('/createid', async (req, res) => {
    try {
        let success = false;
        let { collegeID, email } = req.body;
        let id = await ID.findOne({ collegeID: collegeID });
        if (id) {
            success = false
            return res.status(400).json({ error: "Sorry a user with this collegeID already exists" })
        }
        // Create a new id
        id = await ID.create({
            collegeID: collegeID,
            email: email,
        });
        success = true
        res.send({ success })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 7: Verify a User's College ID using: POST "/api/auth/verifyid". login required

router.post('/verifyid', async (req, res) => {
    try {
        let success = false;
        let { collegeID } = req.body;
        let id = await ID.findOne({ collegeID: collegeID });
        if (!id) {
            success = false
            return res.status(400).json({ error: "Sorry a user with this collegeID doesn't exist" })
        }
        success = true
        res.send({ success })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;