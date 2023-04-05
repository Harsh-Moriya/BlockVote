import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import ElectionContext from '../../Context/Election Context/ElectionContext'
import { useNavigate } from 'react-router-dom';
import VotingContext from '../../Context/Voting Context/VotingContext';

function CreateElection() {

    const electionContext = useContext(ElectionContext);
    const { addElection } = electionContext;
    const votingContext = useContext(VotingContext);
    const { voting, account } = votingContext;
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        if (!account) {
            navigate('/elections')
        }
        // eslint-disable-next-line
    }, [])

    let pushElection = async (e) => {
        e.preventDefault()
        const title = document.querySelector('.new-election-title').value;
        const electionDescription = document.querySelector('.new-election-desc').value;
        const candidateElements = document.querySelectorAll('.new-candidate');
        const candidates = [];

        class Candidate {
            constructor(index, name, description) {
                this.index = index;
                this.name = name;
                this.description = description;
            }
        }

        candidateElements.forEach((element, index) => {
            const name = element.querySelector('.new-candidate-in').value;
            const description = element.querySelector('.new-candidate-desc').value;
            const candidate = new Candidate(index, name, description);
            candidates.push(candidate);
        })

        await voting.contract.createElection(account[0], title, electionDescription, candidates.length);
        addElection(title, electionDescription, candidates);
        navigate('/elections')
    }

    let candidateAdder = () => {

        let candidateIndex = Number(document.getElementById('no-of-candidates').value);
        let candidatesContainer = document.querySelector('.all-candidates');
        let candidates = document.querySelectorAll('.new-candidate');

        for (let i = 1; i <= candidateIndex; i++) {
            if (candidates.length === 0) {
                let newCandidate = `<div class="new-candidate">
                                        <p class='new-candidate-title'>Candidate ${i}</p>
                                        <input class='new-candidate-in' type="text" placeholder='Enter Name' />
                                        <textarea class='new-candidate-desc' placeholder='Enter Candidate Description'></textarea>
                                    </div>`
                candidatesContainer.innerHTML += newCandidate;
            }
        }

    }

    return (
        <>
            <Navbar logged={true} />
            <div className=' creation'>
                <form className="creation-panel" onSubmit={pushElection}>
                    <h2>Create New Election</h2>
                    <div className="separator"></div>
                    <h4>Title</h4>
                    <textarea className='new-election-title' placeholder='Enter Election Title'></textarea>
                    <h4>Description</h4>
                    <textarea className='new-election-desc' placeholder='Enter Election Description'></textarea>
                    <h4>Candidates</h4>
                    <input id="no-of-candidates" placeholder='1' type="number" min="1" max="8" />
                    <div className="add-candidate" onClick={candidateAdder}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="all-candidates">

                    </div>
                    <div className="separator"></div>
                    <button className="add-election-fin" >Add Election</button>
                </form>
            </div>
        </>
    )
}

export default CreateElection