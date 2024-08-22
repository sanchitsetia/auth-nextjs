"use client";
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {


  let inputEmail = useRef();
  let inputPassword = useRef();
  const router = useRouter();

  const [user,setUser] = useState({
    email: "",
    password: ""
  })



  const onLogin = async ()=>{

    try {
    const userData = {
      email: inputEmail.current.value,
      password: inputPassword.current.value
    }
    setUser(userData);
    const response = await axios.post('/api/users/login',userData)
    console.log("login success",response.data);
    router.push("/profile")
      
    } catch (error) {
      console.log("login failed",error)
      console.log("login failed",error.message)
      toast.error(error.message);
      
    }

    
    

  }


  return (
    <div className='flex h-screen flex-col justify-center items-center py-2'>
      <h1>Login</h1>
      <hr/>

<label htmlFor='email'>email</label>
      <input 
      className='p-2 text-black' 
      id = "email"
      type = "text"
      ref={inputEmail}
      placeholder='Email'/>


<label htmlFor='password'>password</label>
      <input 
      className='p-2 text-black' 
      id = "password"
      type = "password"
      ref={inputPassword}
      placeholder='Password'/>

    <button className='m-2 bg-gray-50 text-blue-300 rounded-lg'
    onClick={onLogin}>Login</button>
    <Link href="/signup"> visit Signup page</Link>
    </div>
  )
}

export default LoginPage;