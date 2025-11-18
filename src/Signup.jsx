import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name,setName] = useState()
  const[email,setEmail] = useState()
  const[password,setPassword] = useState()
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:5000/register', {name, email, password})
    .then(result => {console.log(result)
      navigate('/login')
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <div className="box animated-border-box d-flex flex-column gap-5 align-items-center justify-content-center p-5"> 
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
          <label >
            <strong>Name:{" "}</strong>
            <input 
            type="text" 
            placeholder='Enter your name' 
            onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label >
            <strong>Email:{" "}</strong>
            <input 
            type="Email" 
            placeholder='Enter Email' 
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <strong>Password:{" "}</strong>
            <input 
            type="password" 
            placeholder='Enter Password' 
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className='d-flex justify-content-center'>
            <button type='submit' className='p-2 px-5'>Register</button>
          </div>
          <p>Already have an account</p>
          <div className='d-flex justify-content-center'>
            <Link to="/login" type='submit'><button className='p-2 px-5'>Login</button></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
