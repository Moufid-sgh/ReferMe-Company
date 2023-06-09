'use client'

import  useStore  from "../data/store";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { HiOutlineMail } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';


function EmailConfirmation() {

  const router = useRouter();
  const email = useStore(state => state.email);
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    const onVerifyUser = async () => {
      if (router.query.email) {
        setEmail(router.query.email)
        await axios.post("https://refercomp-server.herokuapp.com//user/getUserByEmail", { email: router.query.email }, { withCredentials: true })
          .then(async (resUser) => {
            if (resUser.data) {
              if (resUser.data.emailVerify) {
                //console.log('Your are already verified !', resUser.data)
                setIsVerify(resUser.data.emailVerify)
              } else {
                //console.log('Your are not verified !')
                await axios.post("https://refercomp-server.herokuapp.com//user/verifyAccount", { email: router.query.email }, { withCredentials: true })
                  .then((resUpdateUser) => {
                    if (resUser.data) {
                      //console.log('Verificafion Success !', resUser.data)
                      setIsVerify(resUpdateUser.data.emailVerify)
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    onVerifyUser();
  }, [router.query]);

  return (
    <div className="w-screen h-screen flex items-center justify-center text-center">
      {!isVerify ?
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="flex items-center mb-6">
            <HiOutlineMail className="text-2xl text-blue" />
            <h3 className="font-bold text-2xl tracking-wide ml-2">Verify your email</h3>
          </div>
          {email === '' ?
            <p className="text-lg py-3">We sent an email to your account !</p>
            :
            <div>
              <p className="text-lg">We sent an email to</p>
              <p className="my-2 text-lg italic text-blue">{email}</p>
            </div>
          }
          <p className="text-lg">Click the link inside to get started.</p>
        </div>
        :
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="flex items-center mb-8">
            <HiOutlineMail className="text-2xl text-blue" />
            <h3 className="font-bold text-2xl tracking-wide ml-2">Verify your email</h3>
          </div>

          <BsCheckCircleFill size={75} className='text-lightblue dark:text-white-500' />
          <h3 className="text-2xl mt-5 text-lightblue dark:text-white-500">Your are verified !</h3>
          <button onClick={() => router.push('/login')}
            className="font-medium tracking-wide py-2 px-5 sm:px-8 mt-5 bg-white-500 border-2 rounded-3xl hover:rounded-md dark:bg-blue border-lightblue text-lightblue hover:text-white-500 hover:bg-lightblue hover:border-lightblue dark:border-lightblue dark:text-white-500 transition-all duration-500">
            Get started &#10139;
          </button>
        </div>
      }
    </div>
  )
}

export default EmailConfirmation