import React, {useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import UserContext from '../../Context/UserContext/UserContext';

function Profile(props) {

    const context = useContext(UserContext);
    const {user, getUser} = context;

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="profile">
            <div className="profile-panel">
                <h2 className='title'>Profile</h2>
                <h3 className="name">Name: {user? user.name : 'name'}</h3>
                <h3 className="email">Email: {user? user.email : 'email'}</h3>
                <h3 className="collegeid">College ID: {user? user.collegeID : 'collegeID'}</h3>
                <h3 className="dep">Department: {user? user.branch : 'branch'}</h3>
                <h3 className="year">Year: {user? user.year : 'year'}</h3>
                <h3 className="sem">Semester: {user? user.semester : 'semester'}</h3>
                {props.results ? null : <Link to='/createelection'><button className="create">Create Election</button></Link>}
            </div>
        </div>
    )
}

export default Profile