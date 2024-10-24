import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const VerifyEmail = () => {
  const data = useLocation();
  const obj = new URLSearchParams(data.search)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch(`http://localhost:4000/users/verify-email?token=${obj.get('token')}`)
    .then(res => {
      if(res.ok) {
        navigate('/')
      }
      else {
        navigate('/signup')
      }
    })
    .catch((err) => {
      console.log(err)
      navigate('/signup')
    })
  })

  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail