import React from 'react'
import Profile from '../Profile/Profile'
import ElectionPanel from './ElectionPanel'
import Navbar from '../Navbar/Navbar'

function Elections() {
  return (
    <>
      <Navbar logged={true} />
      <div className='elections'>
        <Profile results={false} />
        <ElectionPanel />
      </div>
    </>
  )
}

export default Elections