import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../../Context/UserContext/UserContext';
import VotingContext from '../../Context/Voting Context/VotingContext';
import AlertContext from '../../Context/Alert Context/AlertContext'

function Profile(props) {

    const userContext = useContext(UserContext);
    const { user, getUser, verify } = userContext;
    const votingContext = useContext(VotingContext);
    const { account, connectWallet } = votingContext;
    const alertContext = useContext(AlertContext);
    const { showAlert, transaction } = alertContext;
    const navigate = useNavigate();

    const handleConnect = async () => {
        transaction('Connecting to Metamask wallet... Please Wait', 'success', false);
        let connection = await connectWallet()
        if (connection.success) {
            if (!connection.refused) {
                transaction('Connected to Metamask wallet', 'success', true);
            } else {
                transaction('Connection Refused', 'danger', true);
            }
        } else {
            transaction('Please Install Metamask wallet', 'danger', true);
        }
    }

    const createElectionBtn = async ()=>{
        if (account) {
            let success = await verify();
            if (success) {
                navigate('/createelection');
            } else {
                showAlert('Please use your own Metamask account', 'danger');
            }
        }
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
                {props.results ? null : (account ? <button className="create" onClick={createElectionBtn} >Create Election</button> : <button className="create" onClick={handleConnect}>Connect Wallet</button>)}
                {/* {props.results ? null : <Link to='/createelection'><button className="create">Create Election</button></Link>} */}
            </div>
        </div>
    )
}

export default Profile