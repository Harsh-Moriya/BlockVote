const express = require('express');
const router = express.Router();
const Election = require('../models/Election');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const fetchuser = require('../middleware/fetchuser');

dotenv.config();

// ROUTE 1: Add a new Election using: POST "/api/elections/addelection". Login required
router.post('/addelection', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, totalVotes, candidates } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const election = new Election({
            title, description, totalVotes, candidates
        })
        const savedElection = await election.save();
        res.json(savedElection)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Get All the Elections using: GET "/api/elections/getelections". Login required
router.get('/getelections', async (req, res) => {
    try {
        const elections = await Election.find();
        res.json(elections)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Election using: PUT "/api/elections/updateelection". Login required
router.put('/updateelection/:id', fetchuser, async (req, res) => {
    const { candidateId, voterId } = req.body;
    try {

        let success = false;
        let election = await Election.findById(req.params.id);
        let candidates = election.candidates;
        let voters = election.voters;
        let allVotes = 0;
        let candidateIndex = Number(candidateId);
        let voted = voters.includes(voterId);

        if (!election) {
            success = false;
            return res.status(404).send("Not Found")
        }
        if (voted) {
            success = false;
            return res.json({ success, error: 'already voted' });
        }

        voters.push(voterId);
        candidates[candidateIndex].votes += 1;

        candidates.forEach(candidate => {
            allVotes += candidate.votes;
        });

        election = await Election.findByIdAndUpdate(req.params.id, { candidates: candidates, totalVotes: allVotes, voters: voters }, { new: true })
        success = true;
        res.json({ success, election });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Election using: DELETE "/api/elections/deleteelection". Login required
router.delete('/deleteelection/:id', async (req, res) => {
    try {
        // Find the election to be delete and delete it
        let election = await Election.findById(req.params.id);
        if (!election) { return res.status(404).send("Not Found") }

        election = await Election.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Election has been deleted", election: election });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;