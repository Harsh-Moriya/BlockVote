import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from "react-router-dom";
import Alert from '../Alert/Alert';
import AlertContext from '../../Context/Alert Context/AlertContext'
import UserContext from '../../Context/UserContext/UserContext';
import VotingContext from '../../Context/Voting Context/VotingContext';

function Registration() {

    const alertcontext = useContext(AlertContext);
    const { alert, showAlert, transaction } = alertcontext;
    const usercontext = useContext(UserContext);
    const { registrationCredentials, setRegistrationCredentials, userRegistration } = usercontext;
    const votingContext = useContext(VotingContext);
    const { account, connectWallet } = votingContext;
    const navigate = useNavigate();

    useEffect(() => {
      if (!window.ethereum) {
        navigate('/')
      }
      // eslint-disable-next-line
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (account) {
                const pass = document.querySelector('#register-password');
                const cPass = document.querySelector('#register-cPassword');
                if (pass.value === cPass.value) {
                    let success = userRegistration();
                    if (success) {
                        // Redirect
                        navigate("/");
                        showAlert('New User Created', 'success')
                    }
                    else {
                        showAlert('Somethin went wrong', 'danger')
                    }
                } else {
                    showAlert('Passwords did not match', 'danger')
                }
            } else {
                transaction('Connecting to Metamask wallet... Please Wait', 'success', false);
                let connection = await connectWallet()
                if (connection.success) {
                    if (!connection.refused) {
                        transaction('Metamask wallet connected...', 'success', true);
                    } else {
                        transaction('Connection Refused', 'danger', true);
                        // navigate('/')
                    }
                } else {
                    transaction('Please Install Metamask wallet', 'danger', true);
                }
            }
        } catch (error) {
            showAlert('Something went wrong', 'danger');
        }
    }

    const onChange = (e) => {
        setRegistrationCredentials({ ...registrationCredentials, [e.target.name]: e.target.value })
    }

    const createOption = (index) => {
        let option = document.createElement('option')
        option.setAttribute('value', index);
        option.textContent = index;
        return option
    }

    const semester = () => {
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
        sem.value = registrationCredentials.semester;
    }

    return (
        <>
            <Navbar logged={false} />
            <Alert alert={alert} />
            <div className='register'>
                <form className="register-panel" onSubmit={handleSubmit}>
                    <h2>Create New Account</h2>
                    <div className="register-write">
                        <div className="register-left">
                            <h4>Name</h4>
                            <input id='register-name' type="text" placeholder='Enter Your Name' name='name' onChange={onChange} required />
                            <h4>Email</h4>
                            <input id='register-email' type="email" placeholder='Enter Your Email' name='email' onChange={onChange} required />
                            <h4>College ID</h4>
                            <input id='register-collegeid' type="text" placeholder='Enter Your College ID' name='collegeID' onChange={onChange} required />
                            <h4>Branch</h4>
                            <select id="dep-select" onChange={onChange} name='branch' required >
                                <option value="">Select Branch</option>
                                <option value="ETC">ETC</option>
                                <option value="ME">ME</option>
                                <option value="CSE">CSE</option>
                                <option value="ELE">ELE</option>
                            </select>
                        </div>
                        <div className="register-left">
                            <h4>Year</h4>
                            <select id="year-select" onChange={onChange} name='year' required >
                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <h4>Semester</h4>
                            <select id="sem-select" onClick={semester} name='semester' onChange={onChange} required >
                                <option value="">Select Semester</option>
                            </select>
                            <h4>Password</h4>
                            <input id='register-password' type="password" placeholder='Enter Your Password' name='password' onChange={onChange} required />
                            <h4>Re-Enter Password</h4>
                            <input id='register-cPassword' type="password" placeholder='Re-Enter Your Password' required />
                        </div>
                    </div>
                    {account ? <button className='btn-registration'>Create Account</button> : <button className='btn-registration'>Connect with Metamask to Proceed</button>}
                    {/* <button className='btn-registration'>Create Account</button> */}
                    <h5>OR</h5>
                    <Link to='/' className='btn-login'>Login</Link>
                </form>
            </div>
        </>
    )
}

export default Registration