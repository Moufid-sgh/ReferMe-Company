'use client'

import Link from "next/link";
import { useState } from "react";
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { MdFingerprint } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


 function Login() {


  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const validEmail = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  //------Send data--------------------//
  const onSubmit = async (e) => {
    e.preventDefault();


    if (email == '' && password == '') {
        toast.error('Please enter your email and password', { toastId: 'success1'});
    }
    else if (email == '' && password !== '') {
        toast.error('Please enter your email', { toastId: 'success1', });
    }
    else if (email !== '' && password == '') {
        toast.error('Please enter your password', { toastId: 'success1', });
    }
    else if (!validEmail.test(email)) {
        toast.error('Invalid email format', { toastId: 'success1', });
    }
    else {
      const data = { email, password }
        try {
            await axios.post('https://refercomp-server.herokuapp.com/auth/login', data, { withCredentials: true })
                .then((response) => {
                    window.localStorage.setItem('account.connected', JSON.stringify(response.data));
                    router.push('/')
                })
                .catch((err) => {
                  console.log(err.response.data)
                  if (err.response.data == 'fail#01') {
                      toast.error('Password incorrect', { toastId: 'success1', });
                  }
                  else if (err.response.data == 'fail#02') {
                      toast.error('Password incorrect', { toastId: 'success1', });
                  } else {
                      toast.error('Login failed...Please try later...', { toastId: 'success1', });
                  }
              })

      } catch (error) {
          console.log(error)
          toast.error('Login failed...Please try later...', { toastId: 'success1', });
      }
  }
};

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient">
       <section className="bg-white-500 rounded-lg p-4 w-[80%] sm:w-[50%] lg:w-[30%]">
        
        <div className="text-center mb-8">
          <h2 className="font-ubuntu text-2xl">ReferMe</h2>
        </div>
        
        <div className="flex items-center space-x-1 mb-4">
          <MdFingerprint size={23} className="text-blue"/>
          <h3 className="font-ubuntu">Login</h3>
        </div>

        <form className="text-center">
        <input type='email' id='email' name='email' placeholder='Email Adress'
                onChange={(e) => { setEmail(e.target.value) }}
                className='inputstyle w-full mb-5'/>

            <div className='relative w-full mb-3'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Password'
                    onChange={(e) => setpassword(e.target.value)}
                    className='inputstyle w-full'/>

                <div onClick={() => { setShowPassword(!showPassword) }} className='absolute right-6 top-2.5 text-blue dark:text-white-500 text-xl cursor-pointer'>
                    {showPassword ? <ImEye size={18}/> : <ImEyeBlocked size={18}/>}
                </div>
            </div>

            <span className="block text-black-500 hover:text-black-600 text-xs text-end italic cursor-pointer transition-500">Forgot password ?</span>

            <button onClick={onSubmit} className="blue-btn mt-4">Log in</button>

            <p className='text-center text-xs text-black-500 mt-6'>NEW user ! <Link href='/signup' className='text-black-600 hover:text-black-500 transition-500 cursor-pointer'>CLick here to Create account</Link></p>

        </form>
       </section>
       <ToastContainer />
    </div>
  )
}

export default Login