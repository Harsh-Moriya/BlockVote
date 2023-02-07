import React from 'react'
import Election from './Election'
import AllElections from '../../AllElections'

function ElectionPanel() {

    return (
        <div className="election-panel">
            <div className="election-search-panel">
                <input type="text" className="election-search" placeholder='Search a Election' />
                <button className="search-btn">Search</button>
            </div>
            <h2 className='elections-title'>All Elections</h2>
            <div className="election-container">
                <Election election={AllElections[0]} />
            </div>
        </div>
    )
}

export default ElectionPanel