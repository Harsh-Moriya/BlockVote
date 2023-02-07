import React from 'react'
import Navbar from '../Navbar/Navbar';

function Registration() {

    let createOption = (index) => {
        let option = document.createElement('option')
        option.setAttribute('value', index);
        option.textContent = index;
        return option
    }

    let semester = () => {
        let year = document.getElementById('year-select');
        let sem = document.getElementById('sem-select');

        let appender = (first, second) => {
            sem.innerHTML = ''
            sem.appendChild(createOption('Select Semester'))
            sem.appendChild(createOption(first))
            sem.appendChild(createOption(second))
        }

        if (year.value === '1') {
            appender(1, 2)
        } else if (year.value === '2') {
            appender(3, 4)
        } else if (year.value === '3') {
            appender(5, 6)
        } else if (year.value === '4') {
            appender(7, 8)
        }
    }

    return (
        <>
            <Navbar logged={false} />
            <div className='register'>
                <div className="register-panel">
                    <h2>Create New Account</h2>
                    <div className="register-write">
                        <div className="register-left">
                            <h4>Name</h4>
                            <input type="text" placeholder='Enter Your Name' />
                            <h4>Email</h4>
                            <input type="text" placeholder='Enter Your Email' />
                            <h4>College ID</h4>
                            <input type="text" placeholder='Enter Your College ID' />
                            <h4>Department</h4>
                            <select id="dep-select">
                                <option value="">Select Department</option>
                                <option value="ETC">ETC</option>
                                <option value="ME">ME</option>
                                <option value="CSE">CSE</option>
                                <option value="ELE">ELE</option>
                            </select>
                        </div>
                        <div className="register-left">
                            <h4>Year</h4>
                            <select id="year-select">
                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <h4>Semester</h4>
                            <select id="sem-select" onClick={semester}>
                                <option value="">Select Semester</option>
                            </select>
                            <h4>Password</h4>
                            <input type="text" placeholder='Enter Your Password' />
                            <h4>Re-Enter Password</h4>
                            <input type="text" placeholder='Re-Enter Your Password' />
                        </div>
                    </div>
                    <a href='/' className='btn-registration'>Create Account</a>
                    <h5>OR</h5>
                    <a href='/' className='btn-login'>Login</a>
                </div>
            </div>
        </>
    )
}

export default Registration