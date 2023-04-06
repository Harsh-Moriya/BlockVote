import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link, useNavigate } from "react-router-dom";
import Alert from '../Alert/Alert';
import AlertContext from '../../Context/Alert Context/AlertContext'
import UserContext from '../../Context/UserContext/UserContext';

function Login() {

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const context = useContext(UserContext);
  const { credentials, setCredentials, userLogin } = context;
  // const [credentials, setCredentials] = useState({ collegeID: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let json = await userLogin();
    if(json.success) {
      localStorage.setItem('token', json.authtoken);
      showAlert('logged in', 'success')
      navigate("/elections");
    } else {
      showAlert('Invalid Credentials', 'danger')
    }
    
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    localStorage.clear();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar logged={false} />
      <Alert alert={alert} />
      <div className='login'>
        <div className="login-panel">
          <div className="login-img"></div>
          <form className="login-write" onSubmit={handleSubmit}>
            <h2>Login To Your Account</h2>
            <h4>College ID</h4>
            <input type="text" id='collegeid' placeholder='Enter Your College ID' name='collegeID' onChange={onChange} required />
            <h4>Password</h4>
            <input type="password" id='password' placeholder='Enter Your Password' name='password' onChange={onChange} required />
            <Link to='/'>Forgot Password ?</Link>
            <button className='btn-login'>Login</button>
            <h5>OR</h5>
            <Link to='/register' className='btn-registration'>Create Account</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login