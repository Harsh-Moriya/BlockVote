import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import UserContext from '../../Context/UserContext/UserContext';
import VotingContext from '../../Context/Voting Context/VotingContext';
import AlertContext from '../../Context/Alert Context/AlertContext'

function Profile(props) {

    const userContext = useContext(UserContext);
    const { user, getUser } = userContext;
    const votingContext = useContext(VotingContext);
    const { account, connectWallet } = votingContext;
    const alertContext = useContext(AlertContext);
    const { transaction } = alertContext;

    const handleConnect = async () => {
        transaction('Connecting to Metamask wallet... Please Wait', 'success', false);
        await connectWallet();
        transaction('Connected to Metamask wallet', 'success', true);
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="profile">
            <div className="profile-panel">
                <h2 className='title'>Profile</h2>
                <h3 className="name">Name: {user ? user.name : 'name'}</h3>
                <h3 className="email">Email: {user ? user.email : 'email'}</h3>
                <h3 className="collegeid">College ID: {user ? user.collegeID : 'collegeID'}</h3>
                <h3 className="dep">Department: {user ? user.branch : 'branch'}</h3>
                <h3 className="year">Year: {user ? user.year : 'year'}</h3>
                <h3 className="sem">Semester: {user ? user.semester : 'semester'}</h3>
                {props.results ? null : (account ? <Link to='/createelection'><button className="create">Create Election</button></Link> : <button className="create" onClick={handleConnect}>Connect Wallet</button>)}
                {/* {props.results ? null : <Link to='/createelection'><button className="create">Create Election</button></Link>} */}
            </div>
        </div>
    )
}

export default Profile