import React from 'react'
import { Elections } from '../../AllElections'
import Navbar from '../Navbar/Navbar';

let newel = {
    title: 'ok',
    description: 'hbjbh',
    candidates: [
        {
            index: 1,
            candidate: 'noth',
            description: 'ajbhcjsdch'
        },
    ]
}
Elections.push(newel)

function CreateElection() {

    console.log(Elections);

    let candidateindex = 2;

    let candidateAdder = () => {
        if (candidateindex <= 6) {
            let allCandidates = document.querySelector('.all-candidates');
            let newCandidate = `<div class="new-candidate">
                                    <p class='new-candidate-title'>Candidate ${candidateindex}</p>
                                    <input class='new-candidate-in' type="text" placeholder='Enter Name' />
                                    <textarea class='new-candidate-desc' placeholder='Enter Candidate Description'></textarea>
                                </div>`
            allCandidates.innerHTML += newCandidate
            candidateindex++;
        }
    }

    return (
        <>
            <Navbar logged={true} />
            <div className=' creation'>
                <div className="creation-panel">
                    <h2>Create New Election</h2>
                    <div className="separator"></div>
                    <h4>Title</h4>
                    <textarea className='election-title' placeholder='Enter Election Title'></textarea>
                    <h4>Description</h4>
                    <textarea className='election-desc' placeholder='Enter Election Description'></textarea>
                    <h4>Candidates</h4>
                    <div className="all-candidates">
                        <div className="new-candidate">
                            <p className='new-candidate-title'>Candidate 1</p>
                            <input className='new-candidate-in' type="text" placeholder='Enter Name' />
                            <textarea className='new-candidate-desc' placeholder='Enter Candidate Description'></textarea>
                        </div>
                    </div>
                    <button className="add-candidate" onClick={candidateAdder}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <div className="separator"></div>
                    <button className="add-election-fin">Add Election</button>
                </div>
            </div>
        </>
    )
}

export default CreateElection