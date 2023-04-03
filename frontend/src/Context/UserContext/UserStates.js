import Context from "./UserContext";
import { useState } from "react";

const UserStates = (props) => {

    const [credentials, setCredentials] = useState({ collegeID: "", password: "" });
    const [registrationCredentials, setRegistrationCredentials] = useState({
        name: '',
        email: '',
        collegeID: '',
        branch: '',
        year: '',
        semester: '',
        password: ''
    })
    const [user, setUser] = useState('');

    // For Logging in the User
    const userLogin = async () => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
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

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
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
                password: registrationCredentials.password
            })
        });
        const json = await response.json()

        return json.success

    }

    // For getting User info
    const getUser = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
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

    return (
        <Context.Provider value={{ user, setUser, getUser, credentials, setCredentials, userLogin, registrationCredentials, setRegistrationCredentials, userRegistration }}>
            {props.children}
        </Context.Provider>
    )

}

export default UserStates;