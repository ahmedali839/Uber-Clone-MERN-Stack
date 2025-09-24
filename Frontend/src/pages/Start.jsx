import React from 'react'
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";


const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1695066584644-5453334ff5ac?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] pt-8 h-screen w-full bg-gray-400 flex justify-between flex-col'>
        <img className='w-16 ml-8 -white' src="/images/uber image.png" alt="Uber_logo" />
        <div className='pb-7 py-4 px-4 bg-white'>
          <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
          <Link to={"/login"} className='flex items-center justify-around w-full text-2xl bg-black text-white py-3 rounded mt-5'>Continue <FaArrowRight className=' ' /> </Link>
        </div>
      </div>
    </div>
  )
}

export default Start