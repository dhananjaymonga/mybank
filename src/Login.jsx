import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch('https://mybank-d04s.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
        credentials: 'include'
      })

      
      const data = await resp.json()
      if(resp.ok) {
        localStorage.setItem('myID', data._id)
        navigate('/')
      }
      console.log(data)
    }
    catch(err) {
      console.log(err)
    }
    
  }

  const handleChange = (e) => {
    const id = e.target.id;
    setLoginData({ ...loginData, [id]: e.target.value})
  }

  return (

    <div className='container'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="text" id="email"  value={loginData.email} placeholder='enter your email' onChange={handleChange}/>
        <input type="password" id="password"  value={loginData.password} placeholder='enter your password' onChange={handleChange}/>
        <button>Login</button>
      </form>
      <Link to="/signup">Go To Signup Page</Link>
    </div>
  )
}

export default Login