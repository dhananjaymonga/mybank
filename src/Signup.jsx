import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate()

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSignup = (e) => {
    e.preventDefault();

    fetch('https://mybank-d04s.onrender.com/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData),
      credentials: 'include'
    })
    .then((res) => {
      if(res.ok) {
        navigate('/')
      }
      else {
        return res.json()
      }
    })
    .then(data => {
      alert(data.error)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  const handleChange = (e) => {
    const id = e.target.id;
    setSignupData({ ...signupData, [id]: e.target.value})
  }

  return (
    <div className='container'>
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <input type="text" id="username" value={signupData.username} placeholder='enter your username' onChange={handleChange} />
        <input type="text" id="email"  value={signupData.email} placeholder='enter your email' onChange={handleChange}/>
        <input type="password" id="password"  value={signupData.password} placeholder='enter your password' onChange={handleChange}/>
        <button>Signup</button>
      </form>
      <Link to="/login">Go To Login Page</Link>
    </div>
  )
}

export default Signup