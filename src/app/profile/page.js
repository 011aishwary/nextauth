'use client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'


const profile = () => {
  const router = useRouter()
  const [data, setData] = useState("")
  const getUserDetails = async ()=>{
    try {
      const res = await axios.post("/api/users/me")
      console.log(res.data.data._id)
      setData(res.data.data._id)
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const logout = async ()=>{
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout Success")
      router.push("/")
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className='m-auto text-white'>
      <div className='text-[20px]'>Profile Page</div>
      <hr />
      <h2>{data === ""? "Nothing to display " : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
      <button onClick={getUserDetails} className='px-2 bg-green-600 rounded-2xl'>Get User</button>
      <br />
      <button onClick={logout} className='px-2 bg-blue-600 rounded-2xl'>Logout</button>
    </div>
    
  )
}

export default profile
