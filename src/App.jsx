import React from 'react'
import Signup from './Signup'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Createpost from './Createpost'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/create' element={<Createpost/>}></Route>
      </Routes>

    </div>
  )
}

export default App
