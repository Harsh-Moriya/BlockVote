import React, { useContext, useEffect } from 'react'
import Election from './Election'
import ElectionContext from '../../Context/Election Context/ElectionContext'
import AlertContext from '../../Context/Alert Context/AlertContext'

function ElectionPanel() {

    const electionContext = useContext(ElectionContext);
    let { elections, getElection, setElections } = electionContext;
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    useEffect(() => {
        getElection();
        // eslint-disable-next-line
    }, [])

    let search = () => {
        let searchBar = document.querySelector('.election-search');
        elections = elections.filter((election) => {
            return election.title.includes(searchBar.value)
        })
        setElections(elections)
        if (elections.length === 0) {
            showAlert('No Elections found', 'danger');
        }
    }

    let repopulate = (e) => {
        if (e.target.value === "") {
            getElection()
        }
    }

    return (
        <div className="election-panel">
            <div className="election-search-panel">
                <input type="text" className="election-search" placeholder='Search a Election' onChange={repopulate} />
                <button className="search-btn" onClick={search}>Search</button>
            </div>
            {/* <h2 className='elections-title'>All Elections</h2> */}
            <div className="election-container">
                {elections && elections.length > 0 && elections.map(election => {
                    return <Election election={election} key={election._id} />
                })}
            </div>
        </div>
    )
}

export default ElectionPanel