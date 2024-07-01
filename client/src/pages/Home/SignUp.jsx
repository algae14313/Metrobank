import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoUB from '../../assets/mbLogo.png'
import LoginBG from '../../assets/mbSignup.jpg'

export default function SignUp() {
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = () => {
        try {
            const credentials = localStorage.getItem('credentials')
            if (credentials) return navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-start items-center">
                <div className="w-full h-full flex justify-start items-center">
                    <div className="w-[70%] h-full flex justify-start items-center">
                        <img src={LoginBG} alt="BG" className='w-full h-full object-cover' />
                    </div>
                    <div className="w-[30%] h-full flex justify-center items-center">
                        <form className='w-full h-full flex flex-col justify-center items-center gap-[1rem] px-[4rem]'>
                            <div className="w-full h-[5rem] flex justify-start items-center">
                                <img src={LogoUB} alt="BG" className='w-full h-full object-contain' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1>Full Name</h1>
                                <input type="text" className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your full name...' />
                            </div>
                            <div className="w-full flex flex-col">
                                <h1>Email</h1>
                                <input type="text" className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your email...' />
                            </div>
                            {/* <div className="w-full flex flex-col">
                                <h1>Mobile No. (Temp)</h1>
                                <input type="text" inputMode='numeric' className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your mobile number...' />
                            </div> */}
                            <div className="w-full flex flex-col">
                                <h1>Password</h1>
                                <input type="password" className='px-[1rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your password...' />
                            </div>
                            <button onClick={handleLogin} className='w-full py-[.6rem] rounded-lg text-[#FFFFFF] hover:bg-[#111111] hover:text-white duration-300 ease bg-[#001A88] shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)]'>
                                Sign Up
                            </button>
                            <div className="w-full flex flex-col justify-start items-start">
                                <p className='text-[.8rem]'>
                                    Already have an account? <span className='cursor-pointer text-black text-decoration-line: underline' onClick={handleLogin}>Sign In.</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
