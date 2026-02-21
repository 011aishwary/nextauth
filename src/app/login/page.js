'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const login = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const onLogin = async () => {

        try {
            setLoading(true)
            const responsee = await axios.post("/api/users/login", user).then(response => {
                setSuccess(true)
                setError("")
                router.push("/profile")
                console.log(response);
            })
                .catch(error => {
                    setSuccess(false)
                    setError(error.response.data.error)
                    
                    console.error('Error fetching data:', error.response.data.error)

                });
            console.log("Login Successful", responsee)
            // if(response.status){
            // }
            
            setLoading(false)

        } catch (error) {
            console.log("Login Failed")
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (user.email.length > 5 && user.password.length > 3) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }


    }, [user])


    return (
        <div className="flex flex-col justify-center sm:h-screen  p-4">
            <div className="max-w-md w-full mx-auto border border-gray-300   rounded-2xl p-8">
                <div className="text-center mb-2 text-white">
                    
                        { loading? "Processing": "Login" }
                        <br />
                        <span className={` bg-green-500  rounded-[4px] text-white ${success?"px-3":""} `}>{ success? "Login Successful" :null }</span>
                        <span className={` bg-red-700  rounded-[4px] text-white ${error?"px-3":""} `}>{ error? `${error}` :null }</span>
                        
                        
                    
                    <br />

                </div>

                <form>
                    <div className="">
                        <div>
                            <label htmlFor='email' className="text-slate-200 text-sm font-medium m-2 block">Email Id</label>
                            <input name="email" type="text" value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="text-white  border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                        </div>
                        <div>
                            <label htmlFor='password' className="text-slate-200 text-sm font-medium m-2 block ">Password</label>
                            <input name="password" type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="text-white  border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                        </div>
                        {/* <div>
              <label htmlFor='username' className="text-slate-200 text-sm font-medium m-2 block ">Username</label>
              <input name="username" type="text"
              value={user.username}
              onChange={(e)=> setUser({...user , username: e.target.value})}
               className="text-white  border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Username" />
            </div> */}

                        {/* <div className="flex items-center mt-1">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="text-slate-200 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);" className="text-blue-600 font-medium hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div> */}
                    </div>

                    <div className="mt-12">
                        <button type="button" onClick={onLogin} className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                            {buttonDisabled ? "Fields Required" : "Login"}
                        </button>
                    </div>
                    <div></div>
                    <p className="text-slate-200 text-sm mt-6 text-center">Don't have an account? <Link href="/signup" className="text-blue-600 font-medium hover:underline ml-1">SignUp here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default login
