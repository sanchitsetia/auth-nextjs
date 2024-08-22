"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login")
      
    } catch (error:any) {
      console.log("error",error.message);
      toast.error(error.message);
      
    }

  }
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <p>Profile Page</p>
      <button onClick={logout} className='bg-blue-500 text-white rounded p-2 m-2'>Logout</button>
    </div>
  )
}

export default ProfilePage