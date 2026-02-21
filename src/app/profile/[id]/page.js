import React from 'react'

export default function page({params}){
  return (
    <div className='text-white'>
      <h1>User Details</h1>
      <br />
      <div className="p-3 bg-green-600 rounded-2xl">{params.id}</div>
    </div>
  )
}

 page
