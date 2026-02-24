// import React from 'react'

// const UpdatePassword = () => {
//   return (
//     <section>
      
//     </section>
//   )
// }

// export default UpdatePassword

import React, { useState } from 'react'
// import Spinner from '../helpers/Spinner'
import { NavLink, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
// import { __AUTH } from '../backend/FirebaseConfig'
import toast from 'react-hot-toast'
import { __AUTH } from '../../backend/FirebaseConfig'


const ForgetPassword = () => {
    let[email,setEmail]=useState("")
    let[isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()
   
    const handleChange=(e)=>{
        setEmail(e.target.value)

    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        // setIsLoading(true)
        try {
            await sendPasswordResetEmail(__AUTH,email)
            toast.success("Reset link sent to mail")
            navigate("/user-profile")
        } catch (error) {
            toast.success(error.message)
        }
    }
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900  flex justify-center items-center  ">
          <div className="  w-[30%] bg bg-slate-700 rounded-lg">
            <header>
              <h1 className="text-center text-3xl p-2"> Update password</h1>
            </header>
            <main className="p-2">
              <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="" className="block text-md">
                    Email
                  </label>
                  <input
                    type="text"
                    id="Email"
                    placeholder="enter email"
                    className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
                    onChange={handleChange}
                    name="email"
                    value={email}
                  />
                </div>
    
               
                <div>
                  <button className="bg-blue-600 p-2 w-[100%] font-semibold rounded-xl mt-2 cursor-pointer  hover:bg-blue-800">
                    Update password
                  </button>
                </div>
                <div className="mt-2 text-center">
              {/* <span>Dont have an account?</span> */}
              <NavLink to="/" className="w-[100%] bg-red-600 block py-2 rounded-lg font-semibold hover:bg-red-700">
                cancel
              </NavLink>
            </div>
                </form>
            </main>
          </div>
          {isLoading && <Spinner />}
        </section> 
  )
}

export default ForgetPassword
