'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
// import { useRouter } from 'next/router'
import Link from 'next/link'

const verifyPage = () => {
    // const router = useRouter()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            axios.post("/api/users/verifyUser", { token })
            setVerified(true)
        } catch (error) {
            console.log("Token Error" , error.response.data)
            setError(true)

        }
    }
    useEffect(() => {
      const urlToken = window.location.search.split("=")[1]
      setToken(urlToken || "")

      // next js method
    //   const {query} = router
    //   const urlToken2= query.token
      
    }, [])
    useEffect(() => {
      if(token.length > 0 && verified==false){
        
        verifyUserEmail()
      }
      setError(true)
      
      
    }, [token])
    
    return (
        <div className="m-auto w-fit border border-zinc-400 rounded-2xl p-20">
            <h1 className='text-3xl text-white mb-4'>Verify Email</h1>
            <h2 className="text-2xl text-white bg-amber-300 flex items-center justify-center rounded-2xl">{token ? `${token}` : "no token"}</h2>
            {verified && <div> 
                <h2 className='text-white '>Verification Successful</h2>
            <Link href={"/login"} className='text-blue-500 '>Login</Link></div>}
            
        </div>
                                                                                        
  )
}

export default verifyPage
