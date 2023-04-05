import Context from "./ElectionContext";
import { useState } from "react";

const ElectionStates = (props) => {

    const host = "http://localhost:5000"
    let electionInitial = []
    const [elections, setElections] = useState(electionInitial)

    // Get all Election
    const getElection = async () => {
        // API Call 
        const response = await fetch(`${host}/api/elections/getelections`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        setElections(json);
    }

    // Add an Election
    const addElection = async (title, description, candidates) => {
        // API Call 
        const response = await fetch(`${host}/api/elections/addelection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, candidates })
        });

        const election = await response.json();
        setElections(elections.concat(election))
    }

    // Edit a Election
    const updateElection = async (electionId, voterId) => {
        // API Call 
        const response = await fetch(`${host}/api/elections/updateelection/${electionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ voterId })
        });
        const json = await response.json();

        return json.success;
    }

    // Delete a election
    // const deleteElection = async (id) => {
    //     // API Call
    //     const response = await fetch(`${host}/api/elections/deleteelection/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const json = response.json(); 
    //     const newElections = elections.filter((election) => { return election._id !== id })
    //     setElections(newElections)
    // }

    return (
        <Context.Provider value={{ elections, setElections, getElection, addElection, updateElection }}>
            {props.children}
        </Context.Provider>
    )

}

export default ElectionStates;