import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import VotingContext from '../../Context/Voting Context/VotingContext';
import AlertContext from '../../Context/Alert Context/AlertContext';

function Navbar(props) {

  const votingContext = useContext(VotingContext);
  const { voting, account, setAccount } = votingContext;
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const navigate = useNavigate();

  useEffect(() => {
    window.ethereum.on('accountsChanged', async () => {
      if (account) {
        const accounts = await voting.provider.listAccounts()
        if (accounts.length === 0) {
          showAlert('Wallet Disconnected', 'danger');
          setAccount(null);
          if (localStorage.getItem('token')) {
            navigate('/elections');
          } else {
            navigate('/');
          }
        } else {
          const accounts = await voting.provider.listAccounts()
          setAccount(accounts);
        }
      }
    })
    // eslint-disable-next-line
  })

  let menu = (e) => {
    let navUlClass = document.querySelector('.nav-ul').classList;
    navUlClass.toggle('ul-visible');
  }

  //   let toggleMode = ()=>{
  //     let mode = document.getElementById('mode').classList;
  //     if(mode.contains('fa-sun')){
  //       mode.remove('fa-sun');
  //       mode.add('fa-moon')
  //     } else {
  //       mode.remove('fa-moon');
  //       mode.add('fa-sun')
  //     }
  // }

  return (
    <nav className="navbar">
      <h2>
        <div>Block<span>&#123;</span>Vote<span>&#125;</span></div>
        <i className="fa-solid fa-bars" onClick={menu}></i>
      </h2>
      <ul className='nav-ul'>
        {props.logged ? <li><Link to="/elections">Elections</Link></li> : <li><Link to="/">Login</Link></li>}
        {props.logged ? <li><Link to="/results">Results</Link></li> : <li><Link to="/register">Create Account</Link></li>}
        {/* <li>
            <i className="fa-solid fa-sun" id='mode' onClick={toggleMode}></i>
          </li> */}
      </ul>
    </nav>
  )
}

export default Navbar