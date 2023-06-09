'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { MdFingerprint } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { validEmail } from "../data/MailRegex";
import axios from 'axios';


function Signup() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setpassword] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState("");

    const [emailTips, setemailTips] = useState(true);
    const [agreeService, setAgreeService] = useState(false);

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-.]).{8,}$/;


    //------Send data--------------------//
    const onSubmit = async (e) => {
        e.preventDefault()

        if (companyName == '') {
            toast.error('Please enter your company name', { toastId: 'success1', })
        }
        else if (!validEmail.test(email) || email == "") {
            toast.error('This is not a professional email or the email format is not valid.', { toastId: 'success1', })
        }
        else if (!password_regex.test(password) || password == '' || password.length < 13) {
            toast.info('The password must contain minimum 13 characters, at least one uppercase letter, one lowercase letter and one special character.',
                { toastId: 'success1' })
        }
        else if (password !== confirmPwd) {
            toast.error('Passwords does not match', { toastId: 'success1' })
        }
        else if (agreeService == false) {
            toast.error('Take sure to agree to the ReferMe service', { toastId: 'success1' })
        }

        else {
            const data = { companyName, email, password, emailTips };

            await axios.post('https://refercomp-server.herokuapp.com/auth/register', data, { withCredentials: true })
                .then((res) => {
                    window.localStorage.setItem('account.connected', JSON.stringify(res.data));
                    router.push('/emailconfirmation')
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Error, try again or contact support if the problem persists.', { toastId: 'success1', });
                })
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient">
            <section className="bg-white-500 rounded-lg p-4 w-[85%] sm:w-[63%] lg:w-[40%] xl:w-[33%]">

                <div className="text-center mb-8">
                    <h2 className="font-ubuntu text-2xl">ReferMe</h2>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                    <MdFingerprint size={23} className="text-blue" />
                    <h3 className="font-ubuntu">Sign up</h3>
                </div>

                <form className="text-center">
                    <input type='text' id='company' name='company' placeholder='Company name'
                        onChange={(e) => { setCompanyName(e.target.value) }}
                        className='inputstyle w-full mb-5'
                    />

                    <input type='email' id='email' name='email' placeholder='Email Adress'
                        onChange={(e) => { setEmail(e.target.value) }}
                        className='inputstyle w-full mb-5'
                    />


                    <div className='relative mb-5'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Password' required
                            onChange={(e) => { setpassword(e.target.value) }} onFocus={()=>setIsInputFocused(true)} onBlur={()=>setIsInputFocused(false)}
                            className='inputstyle w-full' />


                        <div onClick={() => setShowPassword(!showPassword)} className='absolute right-6 top-2.5 text-blue dark:text-white-500 text-xl cursor-pointer'>
                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>

                        {isInputFocused  && <p className="text-black-500 text-xs text-start ml-1 transition-500 transition-opacity duration-500 transform translate-y-2">
                            A minimum of 13 characters must be used, with 1 uppercase, 1 lowercase and 1 special character.
                        </p>}
                    </div>

                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'} id='confirmPwd' name='confirmPwd' placeholder='Confirm password' required
                            onChange={(e) => { setConfirmPwd(e.target.value) }}
                            className='inputstyle w-full' />

                        <div onClick={() => setShowPassword(!showPassword)} className='absolute right-6 top-2.5 text-blue dark:text-white-500 text-xl cursor-pointer'>
                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>
                    </div>

                    <div className='mt-10 space-y-2'>

                        <div className='flex items-center'>
                            <input id="checkedemail" type="checkbox" checked={emailTips}
                                onChange={(e) => { setemailTips(e.target.checked) }}
                                className="rounded-md border-2 border-blue focus:ring-0 cursor-pointer w-5 h-5 "
                            />
                            <label htmlFor="checkedemail" className="text-xs text-black-500 ml-2">
                                Send me emails with tips on how yo find talent that fits my needs.
                            </label>
                        </div>


                        <div className='flex text-xs'>
                            <input id="checkedAgree" type="checkbox" checked={agreeService}
                                onChange={(e) => { setAgreeService(e.target.checked) }}
                                className="rounded-md border-2 border-blue focus:ring-0 cursor-pointer w-5 h-5 "
                            />

                            <p className="text-start text-black-500 ml-2">I understand and agree to the
                                <span className='text-blue cursor-pointer mx-1'>ReferMe Service,</span>including
                                <span className='text-blue cursor-pointer'> User Agreement</span>and<span className='text-blue cursor-pointer ml-1'>Privacy Policy</span>.
                            </p>
                        </div>
                    </div>

                    <button onClick={onSubmit} className="blue-btn mt-4">Sign up</button>

                    <p className='text-center text-xs text-black-500 mt-6'>Already have an account? <Link href='/login' className='text-black-600 hover:text-black-500 transition-500 cursor-pointer'>Log in</Link></p>

                </form>
            </section>
            <ToastContainer />
        </div>
    )
}

export default Signup