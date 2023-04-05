import React, { useContext, useEffect } from 'react'
import Result from './Result'
import ElectionContext from '../../Context/Election Context/ElectionContext'
import VotingContext from '../../Context/Voting Context/VotingContext';

function ResultPanel() {

    const electionContext = useContext(ElectionContext);
    let { elections, getElection, setElections } = electionContext;
    const votingContext = useContext(VotingContext);
    const { allElections, fetchETHElections } = votingContext;

    useEffect(() => {
        getElection();
        fetchETHElections();
        // eslint-disable-next-line
    }, [])

    let search = () => {
        let searchBar = document.querySelector('.result-search');
        elections = elections.filter((election) => {
            return election.title.includes(searchBar.value)
        })
        setElections(elections)
    }

    let repopulate = (e) => {
        if (e.target.value === "") {
            getElection()
        }
    }

    return (
        <div className="result-panel">
            <div className="result-search-panel">
                <input type="text" className="result-search" placeholder='Search a result' onChange={repopulate} />
                <button className="search-btn" onClick={search}>Search</button>
            </div>
            {/* <h2 className='results-title'>All results</h2> */}
            <div className="all-result-container">
                {allElections && elections && elections.length > 0 && elections.map((election) => {
                    return <Result election={election} key={election._id} />
                })}
            </div>
        </div>
    )
}

export default ResultPanel