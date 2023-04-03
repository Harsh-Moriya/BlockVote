import React from 'react'

function Result(props) {

    let resultDown = (e) => {
        if (e.target.classList.contains('result-expand')) {
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
        <div className="result">
            <div className="result-title">
                <h5>{props.election.title}</h5>
                <button className="result-expand" onClick={resultDown}><i className="fa-solid fa-chevron-down"></i></button>
            </div>
            <div className="candidate-results">
                <p className="result-description">Description:- {props.election.description}</p>
                <div className="candidate-result-container">

                    {props.election.candidates && props.election.candidates.length > 0 && props.election.candidates.map((candidate) => {
                        return (<div className="candidate-result" key={candidate.index}>
                                    <h5 className='candidate-result-name'>{candidate.name}</h5>
                                    <div className="result-container">
                                        <div className="result-bar" style={{ width: `${candidate.votes/props.election.totalVotes * 100}%` }}></div>
                                    </div>
                                    <h6 className='result-value'>{candidate.votes}/{props.election.totalVotes}</h6>
                                </div>)
                    })}

                </div>
            </div>
        </div>
    )
}

export default Result