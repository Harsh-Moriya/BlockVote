import React, { useContext } from 'react'
import ElectionContext from '../../Context/Election Context/ElectionContext'
import AlertContext from '../../Context/Alert Context/AlertContext'
import UserContext from '../../Context/UserContext/UserContext';
import VotingContext from '../../Context/Voting Context/VotingContext';

function Election(props) {

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;
    const userContext = useContext(UserContext);
    const { user } = userContext;
    const electionContext = useContext(ElectionContext);
    const { updateElection } = electionContext;
    const votingContext = useContext(VotingContext);
    const { account } = votingContext;

    let voted = async (candidateId) => {
        if (account) {
            let success = await updateElection(props.election._id, candidateId, user._id);
            if (success) {
                showAlert('Vote added successfully', 'success');
            }
            if (!success) {
                showAlert('Already Voted', 'danger');
            }
        } else {
            showAlert('Please Connect to your Metamask Wallet', 'danger');
        }
    }

    let electionDown = (e) => {

        if (e.target.classList.contains('election-expand')) {
            if (e.target.parentElement.nextSibling.classList.contains('drop')) {
                e.target.childNodes[0].classList.remove('fa-chevron-up')
                e.target.childNodes[0].classList.add('fa-chevron-down')
                e.target.parentElement.nextSibling.classList.remove('drop')
            } else {
                e.target.childNodes[0].classList.remove('fa-chevron-down')
                e.target.childNodes[0].classList.add('fa-chevron-up')
                e.target.parentElement.nextSibling.classList.add('drop')
            }
        } else {
            if (e.target.parentElement.parentElement.nextSibling.classList.contains('drop')) {
                e.target.classList.remove('fa-chevron-up')
                e.target.classList.add('fa-chevron-down')
                e.target.parentElement.parentElement.nextSibling.classList.remove('drop')
            } else {
                e.target.classList.remove('fa-chevron-down')
                e.target.classList.add('fa-chevron-up')
                e.target.parentElement.parentElement.nextSibling.classList.add('drop')
            }
        }

    }

    return (
        <div className="election">
            <div className="election-title">
                <h5>{props.election.title}</h5>
                <button className="election-expand" onClick={electionDown}><i className="fa-solid fa-chevron-down"></i></button>
            </div>
            <div className="election-candidates">
                <p className="election-description">Description:- {props.election.description}</p>
                <div className="candidate-container">

                    {props.election.candidates && props.election.candidates.length > 0 && props.election.candidates.map((candidate) => {
                        return (<div className="candidate" key={candidate.index}>
                            <h5 className='candidate-name'>{candidate.name}</h5>
                            <p className="candidate-description">{candidate.description}</p>
                            <button className="vote" onClick={() => { voted(candidate.index) }}>Vote</button>
                        </div>)
                    })}


                </div>
            </div>
        </div>
    )
}

export default Election