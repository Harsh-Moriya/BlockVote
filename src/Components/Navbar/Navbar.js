import React from 'react'

function Navbar(props) {

    let menu = (e)=>{
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
          {props.logged?<li><a href="/elections">Elections</a></li>:<li><a href="/">Login</a></li>}
          {props.logged?<li><a href="/results">Results</a></li>:<li><a href="/register">Create Account</a></li>}
          {/* <li>
            <i className="fa-solid fa-sun" id='mode' onClick={toggleMode}></i>
          </li> */}
        </ul>
    </nav>
  )
}

export default Navbar