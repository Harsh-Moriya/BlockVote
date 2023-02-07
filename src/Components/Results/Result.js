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
                    <div className="candidate-result">
                        <h5 className='candidate-result-name'>{props.election.candidates[0].candidate}</h5>
                        <div className="result-container">
                            <div className="result-bar" style={{width: '20%'}}></div>
                        </div>
                        <h6 className='result-value'>{props.election.candidates[0].votes}/{props.election.totalVotes}</h6>
                    </div>
                    <div className="candidate-result">
                        <h5 className='candidate-result-name'>{props.election.candidates[1].candidate}</h5>
                        <div className="result-container">
                            <div className="result-bar" style={{width: '17%'}}></div>
                        </div>
                        <h6 className='result-value'>{props.election.candidates[1].votes}/{props.election.totalVotes}</h6>
                    </div>
                    <div className="candidate-result">
                        <h5 className='candidate-result-name'>{props.election.candidates[2].candidate}</h5>
                        <div className="result-container">
                            <div className="result-bar" style={{width: '50%'}}></div>
                        </div>
                        <h6 className='result-value'>{props.election.candidates[2].votes}/{props.election.totalVotes}</h6>
                    </div>
                    <div className="candidate-result">
                        <h5 className='candidate-result-name'>{props.election.candidates[3].candidate}</h5>
                        <div className="result-container">
                            <div className="result-bar" style={{width: '12%'}}></div>
                        </div>
                        <h6 className='result-value'>{props.election.candidates[3].votes}/{props.election.totalVotes}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result