"use client"

import Link from 'next/link'
// import React from 'react'
import { useState } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")

    const generate = () => {
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/users/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")
                setshorturl("")
                console.log(result)
                // alert(`${process.env.NEXT_PUBLIC_HOST}`)
                alert(result.message)
                
            })
            .catch((error) => console.error(error.message));
    }

    return (
        <div className=' bg-zinc-600 w-[40vw] h-[40vh] m-auto mt-12 rounded-2xl flex flex-col items-center p-6'>
            <h1 className='mb-3 font-bold text-[22px]'>
                Generate Your Links Here
            </h1>
            <div className='flex flex-col gap-3 '>
                <input className='border-black bg-amber-50  rounded-lg text-[12px] font-extralight p-1 px-8' type="text"  placeholder='Enter Your Link'
                    value={url} 
                    onChange={e => { seturl(e.target.value) }}
                />
                <input className='border-black bg-amber-50  rounded-lg text-[12px] font-extralight p-1 px-8' type="text" placeholder='Enter Your Prefferd Link' 
                    value={shorturl}
                    onChange={e => { setshorturl(e.target.value) }}
                />
            </div>
            <button onClick={generate} className='bg-gray-900 p-1 px-6 my-3 rounded-lg text-white text-[12px]'>Generate</button>

            {generated && <>
                <div className='text-[12px]'>Here is your shorted url , Click on the link to get redirected</div>
                <div className='text-shadow-amber-400 '><Link href={generated}>{generated}</Link> </div>
            </> }
        </div>
    )
}

export default Shorten
