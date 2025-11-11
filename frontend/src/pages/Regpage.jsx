import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { UserData } from '../context/user';

const Regpage = () => {
   const[email,setEmail]=useState('');
   const[name,setName]=useState('')
   const[password,setPassword]=useState('');
   const{registerUser}=UserData()

   const navigate=useNavigate()

  const SubmitRegdata=(e)=>{
    e.preventDefault();
    registerUser(name,email,password,navigate)
  }
  return (
<>

 <div className="flex items-center justify-center h-screen max-h-screen">
   <div className="bg-blue-400 text-white p-8 rounded-2xl shadow-lg max-w-md w-full ">
    <h2 className='text-3xl font-semibold text-center mb-8'>Welcome Back </h2>

    <form  className='mt-8' onSubmit={SubmitRegdata}>
   <div className="mb-4">
    <label className='block text-sm font-medium mb-1'>
     username
    </label>
    <input type="text" placeholder=' username' className='auth-input' value={name} onChange={e=>setName(e.target.value)} required />
   </div>
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

   <button className='auth-input'>Welcome </button>

    </form>

<div className='text-center mt-6'>
            <Link to='/login' className='text-sm text-gray-400 hover:text-gray-300'>
            
            haven Welcome?</Link>
            </div>
   </div>

  </div>
</>
  )
}

export default Regpage