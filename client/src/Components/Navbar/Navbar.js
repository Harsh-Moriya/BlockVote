import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import VotingContext from '../../Context/Voting Context/VotingContext';
import AlertContext from '../../Context/Alert Context/AlertContext';
import UserContext from '../../Context/UserContext/UserContext';

function Navbar(props) {

  const votingContext = useContext(VotingContext);
  const { voting, account, setAccount } = votingContext;
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const userContext = useContext(UserContext);
  const { verify } = userContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        if (account) {
          const accounts = await voting.provider.listAccounts()
          if (accounts.length === 0) {
            showAlert('Metamask Wallet Disconnected', 'danger');
            setAccount(null);
            if (localStorage.getItem('token')) {
              navigate('/elections');
              window.location.reload()
            } else {
              navigate('/');
              window.location.reload()
            }
          } else {
            const accounts = await voting.provider.listAccounts()
            setAccount(accounts);
          }
        }
      })
    }
    // eslint-disable-next-line
  })

  const isConnected = async () => {
    if (account) {
      let success = await verify();
      if (success) {
        navigate('/results');
      } else {
        showAlert('Please Connect to your own Metamask account', 'danger');
      }
    } else {
      showAlert('Please Connect to your Metamask Wallet', 'danger');
    }
  }

  let menu = (e) => {
    let navUlClass = document.querySelector('.nav-ul').classList;
    navUlClass.toggle('ul-visible');
  }

  return (
    <nav className="navbar">
      <h2>
        <div>Block<span>&#123;</span>Vote<span>&#125;</span></div>
        <i className="fa-solid fa-bars" onClick={menu}></i>
      </h2>
      <ul className='nav-ul'>
        {props.logged ? <li><Link to="/elections">Elections</Link></li> : <li><Link to="/">Login</Link></li>}
        {props.logged ? <li><Link to="/elections" onClick={isConnected}>Results</Link></li> : <li><Link to="/register">Create Account</Link></li>}
      </ul>
    </nav>
  )
}

export default Navbar