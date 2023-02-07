import React from 'react'
import Navbar from '../Navbar/Navbar'

function Login() {

  return (
    <>
      <Navbar logged={false} />
      <div className='login'>
        <div className="login-panel">
          <div className="login-img"></div>
          <div className="login-write">
            <h2>Login To Your Account</h2>
            <h4>College ID</h4>
            <input type="text" id='collegeid' placeholder='Enter Your College ID' />
            <h4>Password</h4>
            <input type="text" id='password' placeholder='Enter Your Password' />
            <a href='/'>Forgot Password ?</a>
            <a href='/elections' className='btn-login'>Login</a>
            <h5>OR</h5>
            <a href='/register' className='btn-registration'>Create Account</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login