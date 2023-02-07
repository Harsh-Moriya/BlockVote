import React from 'react'

function Election(props) {

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
                    <div className="candidate">
                        <h5 className='candidate-name'>{props.election.candidates[0].candidate}</h5>
                        <p className="candidate-description">{props.election.candidates[0].description}</p>
                        <button className="vote">Vote</button>
                    </div>
                    <div className="candidate">
                        <h5 className='candidate-name'>{props.election.candidates[1].candidate}</h5>
                        <p className="candidate-description">{props.election.candidates[1].description}</p>
                        <button className="vote">Vote</button>
                    </div>
                    <div className="candidate">
                        <h5 className='candidate-name'>{props.election.candidates[2].candidate}</h5>
                        <p className="candidate-description">{props.election.candidates[2].description}</p>
                        <button className="vote">Vote</button>
                    </div>
                    <div className="candidate">
                        <h5 className='candidate-name'>{props.election.candidates[3].candidate}</h5>
                        <p className="candidate-description">{props.election.candidates[3].description}</p>
                        <button className="vote">Vote</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Election