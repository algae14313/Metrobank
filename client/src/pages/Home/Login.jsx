import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mbLogo from '../../assets/mbLogo.png'
import mbLogin from '../../assets/mbLogin.jpeg'
import axios from 'axios'

const VITE_HOST = import.meta.env.VITE_HOST
const VITE_ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
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

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${VITE_HOST}/api/loginuser`, values, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            if (res.data.success) {
                const { token, userId, role } = res.data
                localStorage.setItem('credentials', JSON.stringify({ token, userId, role }))
                navigate('/')
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="w-full h-screen flex flex-col justify-start items-center">
            <div className="w-full h-full flex">
                <div className="w-2/3 h-full">
                    <img src={mbLogin} alt="BG" className='w-full h-full object-cover' />
                </div>
                <div className="w-1/3 h-full flex justify-center items-center">
                    <form
                        onSubmit={handleLogin}
                        className='w-full h-full flex flex-col justify-center items-center gap-4 px-16'>
                        <div className="w-full h-20 flex justify-start items-center">
                            <img src={mbLogo} alt="Logo" className='w-full h-full object-contain' />
                        </div>
                        <div className="w-full flex flex-col">
                            <h1 className="text-lg font-medium">Email</h1>
                            <input onChange={handleOnChange} type="email" name='email' className='px-4 py-2 rounded-md placeholder:text-sm' placeholder='Enter your email...' />
                        </div>
                        <div className="w-full flex flex-col">
                            <h1 className="text-lg font-medium">Password</h1>
                            <input onChange={handleOnChange} type="password" name='password' className='px-4 py-2 rounded-md placeholder:text-sm' placeholder='Enter your password...' />
                        </div>
                        <button type='submit' className='w-full py-3 rounded-lg text-gray-700 hover:bg-black hover:text-white duration-300 ease bg-gray-300 shadow-lg'>
                            Login
                        </button>
                        <div className="w-full flex flex-col justify-start items-start">
                            <p className='text-sm'>
                                Don't have an account? <span className='cursor-pointer text-black underline' onClick={handleSignUp}>Sign Up.</span>
                            </p>
                            <p className='cursor-pointer text-sm text-black underline'>
                                Forgot password?
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
