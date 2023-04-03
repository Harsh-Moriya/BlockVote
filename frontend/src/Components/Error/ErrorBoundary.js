import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorBoundary() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/')
    })
  return (
    <div>ErrorBoundary</div>
  )
}

export default ErrorBoundary