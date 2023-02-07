import React from 'react'
import Result from './Result'
import AllElections from '../../AllElections'

function ResultPanel() {

    return (
        <div className="result-panel">
            <div className="result-search-panel">
                <input type="text" className="result-search" placeholder='Search a result' />
                <button className="search-btn">Search</button>
            </div>
            <h2 className='results-title'>All results</h2>
            <div className="all-result-container">
                <Result election={AllElections[0]} />
            </div>
        </div>
    )
}

export default ResultPanel