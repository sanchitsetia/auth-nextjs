"use client";
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter();

  let inputUsername = useRef();
  let inputEmail = useRef();
  let inputPassword = useRef();

  const [user,setUser] = useState({})

  const onSignup = async ()=>{
    try {
      console.log(inputEmail.current.value)
      const userData = {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
        username: inputUsername.current.value
      };
      setUser(userData)

      console.log("user",user)
      const response = await axios.post("/api/users/signup",userData);
      console.log("Signup success", response.data)
      router.push("/login");
      
    } catch (error:any) {
      console.log("signup failed",error)
      console.log("signup failed",error.message)
      toast.error(error.message);
    }

  }


  return (
    <div className='flex h-screen flex-col justify-center items-center py-2'>
      <h1>Signup</h1>
      <hr/>
      <label htmlFor='username'>username</label>
      <input 
      className='p-2 text-black' 
      id = "username"
      type = "text"
      ref={inputUsername}
      placeholder='username'/>

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
    onClick={onSignup}>Signup</button>
    <Link href="/login"> visit login page</Link>
    </div>
  )
}

export default SignupPage