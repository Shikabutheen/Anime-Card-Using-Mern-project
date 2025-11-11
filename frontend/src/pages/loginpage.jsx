import React, { useState } from 'react'
import {Link, useNavigate}from 'react-router-dom'
import { UserData } from '../context/user';

const Loginpage = () => {

  const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const{loginUser,btnlod}=UserData()

   const navigate=useNavigate()

  const Submitlogindata=(e)=>{
    e.preventDefault();
    loginUser(email,password,navigate)
  }
  return (
  <>
  <div className="flex items-center justify-center h-screen max-h-screen">
   <div className="bg-blue-400 text-white p-8 rounded-2xl shadow-lg max-w-md w-full ">
    <h2 className='text-3xl font-semibold text-center mb-8'>Welcome Back </h2>

    <form  className='mt-8' onSubmit={Submitlogindata}>
   <div className="mb-4">
    <label className='block text-sm font-medium mb-1'>
      Email or username
    </label>
    <input type="email" placeholder='Email or username' className='auth-input' value={email} onChange={e=>setEmail(e.target.value)} required />
   </div>
   <div className="mb-4">
    <label className='block text-sm font-medium mb-1'>
    Password
    </label>
    <input type="password" placeholder='Password' className='auth-input' value={password} onChange={e=>setPassword(e.target.value)} required />
   </div>

  <button className='auth-input' disabled={btnlod}>
  {btnlod ? "Loading..." : "Login"}
</button>

    </form>

<div className='text-center mt-6'>
            <Link to='/reg' className='etxt-sm text-gray-400 hover:text-gray-300'>
            
            haven't Welcome?</Link>
            </div>
   </div>

  </div>
  
  </>
  )
}

export default Loginpage