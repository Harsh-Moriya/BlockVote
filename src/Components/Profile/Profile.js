import React from 'react'
import User from '../../CurrentUser'

function Profile(props) {
    return (
        <div className="profile">
            <div className="profile-panel">
                <h2 className='title'>Profile</h2>
                <h3 className="name">Name: {User[0].name}</h3>
                <h3 className="email">Email: {User[0].email}</h3>
                <h3 className="collegeid">College ID: {User[0].collegeid}</h3>
                <h3 className="dep">Department: {User[0].department}</h3>
                <h3 className="year">Year: {User[0].year}</h3>
                <h3 className="sem">Semester: {User[0].semester}</h3>
                {props.results?null:<a href='/createelection'><button className="create">Create Election</button></a>}
            </div>
        </div>
    )
}

export default Profile