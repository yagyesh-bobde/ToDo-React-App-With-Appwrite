import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/appwriteConfig'

const Login = () => {
    const navigate = useNavigate()
    const [user, setuser] = useState({
        email: "",
        password: ""
    })
    
    const loginUser = async(e) => {

        e.preventDefault()
        const promise = account.createEmailSession(user.email , user.password);

        promise.then(function (response) {
            // console.log(response); // Success
            navigate('/profile') 
        }, function (error) {
            console.log(error); // Failure
            setuser({
                email: "",
                password: ""
            })
        });
    }

  return (
      <div className='flex items-center justify-center h-[100vh] w-[100%]'>
          <form className="flex flex-col m-auto md:w-1/4 h-1/2 p-5 justify-evenly border-2 border-black rounded-xl shadow-2xl" onSubmit={loginUser}>
            <h1 className='text-center text-3xl font-bold' >Log In</h1>
              
              <input className="block border-2 p-3 rounded-full" type="email" placeholder="Email" onChange={(e) => setuser({ ...user, email: e.target.value })} />
              <input className="block border-2 p-3 rounded-full" type="password" placeholder="Password" onChange={(e) => setuser({ ...user, password: e.target.value })} />
              
              <button className='border-2 w-full text-xl md:w-1/3 rounded-full mx-auto py-3 bg-emerald-400 text-white font-semibold hover:scale-105 bg-black' type="submit">Log In</button>


              <span className="text-sm">
                Don't have an account? <a href="/signup" className="text-blue hover:text-blue font-semibold hover:underline">Sign up</a>
              </span>
          </form>
      </div>
  )
}

export default Login