import React, { useContext } from 'react'
import Profile from '../Profile/Profile'
import ElectionPanel from './ElectionPanel'
import Navbar from '../Navbar/Navbar'
import AlertContext from '../../Context/Alert Context/AlertContext'
import Alert from '../Alert/Alert'

function Elections() {

  const context = useContext(AlertContext);
  const { alert } = context;

  return (
    <>
      <Navbar logged={true} />
      <Alert alert={alert} />
      <div className='elections'>
        <Profile results={false} />
        <ElectionPanel />
      </div>
    </>
  )
}

export default Elections