import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/appwriteConfig'
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {

   const naviate = useNavigate(); 
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const signupUser = async(e) => {
        e.preventDefault()

        // signup
        const promise = account.create(
            uuidv4(),
            user.email,
            user.password,
            user.name
        )

        promise.then(
            function(response) {
                // console.log(response);
                naviate('/profile') 
            }, 
            function(error){
                console.log(error);
            }
        )
    }
  return (
    <div className='flex items-center justify-center h-[100vh] w-[100%] bg-bg-dark text-white'>
          <form className="flex flex-col m-auto md:w-1/4 h-1/2 p-5 justify-evenly border-2 border-black rounded-xl bg-list-dark shadow-dark-shadow bg-dark-gradient" onSubmit={signupUser}>
              <h1 className='text-center text-3xl font-bold' >Create an account</h1>
              <input className="block border-b-2 p-3 rounded-lg active:outline-none active:border-x-none active:border-t-none text-black" type="text" id='name' placeholder="Name" onChange={(e) => setuser({...user, name: e.target.value})} />
              <input className="block border-b-2 p-3 rounded-lg active:outline-none active:border-x-none active:border-t-none text-black" type="email" placeholder="Email" onChange={(e) => setuser({...user, email: e.target.value})} />
              <input className="block border-b-2 p-3 rounded-lg active:outline-none active:border-x-none active:border-t-none text-black" type="password" placeholder="Password" onChange={(e) => setuser({...user, password: e.target.value})} />
            <button className='font-bold text-lg w-1/3 rounded-full mx-auto py-3 bg-black' type="submit">Sign Up</button>
              <span className="text-sm">
                  Already have an account? <a href="/" className="text-blue hover:text-blue font-semibold underline">Log In</a>
              </span>
        </form>
    </div>
  )
}

export default Signup