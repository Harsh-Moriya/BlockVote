import React from 'react'
import Profile from '../Profile/Profile'
import ResultPanel from './ResultPanel'
import Navbar from '../Navbar/Navbar'

function Results() {
  return (
    <>
      <Navbar logged={true} />
      <div className='results'>
        <Profile results={true} />
        <ResultPanel />
      </div>
    </>
  )
}

export default Results