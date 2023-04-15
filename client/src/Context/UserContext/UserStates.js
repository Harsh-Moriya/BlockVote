import Context from "./UserContext";
import { useState, useContext } from "react";
import VotingContext from "../Voting Context/VotingContext";

const UserStates = (props) => {

    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({ collegeID: "", password: "" });
    const [registrationCredentials, setRegistrationCredentials] = useState({
        name: '',
        email: '',
        collegeID: '',
        branch: '',
        year: '',
        semester: '',
        password: '',
    })
    const [user, setUser] = useState('');
    const votingContext = useContext(VotingContext);
    const { account } = votingContext;

    // For Logging in the User
    const userLogin = async () => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ collegeID: credentials.collegeID, password: credentials.password })
        });
        const json = await response.json()

        return json
    }

    // For Creating a new User
    const userRegistration = async () => {
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: registrationCredentials.name,
                email: registrationCredentials.email,
                collegeID: registrationCredentials.collegeID,
                branch: registrationCredentials.branch,
                year: registrationCredentials.year,
                semester: registrationCredentials.semester,
                password: registrationCredentials.password,
                metamaskAcc: account[0],
            })
        });
        const json = await response.json()

        return json.success

    }

    // For getting User info
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setUser(json.user)

        return json.success
    }

    // For verifying Metamask account
    const verify = async () => {
        const response = await fetch(`${host}/api/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                metamaskAcc: account[0],
            })
        });
        const json = await response.json()

        return json.success
    }

    // For verifying college IDs Metamask account
    const verifyID = async () => {
        const response = await fetch(`${host}/api/auth/verifyid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collegeID: registrationCredentials.collegeID,
            })
        });
        const json = await response.json()

        return json.success
    }

    // For verifying user using otp
    const sendOTP = async (collegeID) => {
        const response = await fetch(`${host}/api/auth/otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collegeID: collegeID,
            })
        });
        const otpObj = await response.json()

        return otpObj
    }

    return (
        <Context.Provider value={{ user, setUser, getUser, credentials, setCredentials, userLogin, registrationCredentials, setRegistrationCredentials, userRegistration, verify, verifyID, sendOTP }}>
            {props.children}
        </Context.Provider>
    )

}

export default UserStates;