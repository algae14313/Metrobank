import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoUB from '../../assets/mbLogo.png'
import LoginBG from '../../assets/mbLogin.jpeg'
import { useToast } from "@/components/ui/use-toast"
import { InputOTPForm } from '@/components/OTP'
import Loading from '@/components/Loading'
import { io } from 'socket.io-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials'
import { fetchLoginUser, fetchOtp } from '@/api/User'
const { VITE_HOST } = import.meta.env

const socket = io(VITE_HOST, {
    transports: ['websocket'],
    debug: true
});

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [verify, setVerify] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

    const { data: credentials = '', isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['loginCredentials']
    })

    const { mutateAsync: LoginUser, isPending: loginLoading } = useMutation({
        mutationFn: fetchLoginUser,
        onSuccess: (data) => {
            if (!data?.success) return toast({ title: "Uh oh! Something went wrong.", description: data?.message })
            if (!data?.user?.isactive) {
                setVerify(true)
                toast({ title: "2-Factor-Authentication", description: 'A one-time-password has been sent to your email!' })
                return
            }
            const token = data.token
            const userId = data.userId
            const role = data.role

            sessionStorage.setItem('credentials', JSON.stringify({ token, userId, role }))
            navigate('/')
        }
    })

    const { mutateAsync: OTPUser, isPending: otpLoading } = useMutation({
        mutationFn: fetchOtp,
        onSuccess: (data) => {
            if (data?.success) {
                const token = data?.token
                const userId = data?.userId
                const role = data?.role
                sessionStorage.setItem('credentials', JSON.stringify({ token, userId, role }))

                toast({ title: "Yay! Success.", description: 'You have been verified.', });
                navigate('/')
                return
            }
            toast({ title: "Uh, oh! Something went wrongs.", description: data?.message, });
        }
    })

    const handleOtpSubmit = (pin) => {
        OTPUser({ otp: pin })
    }

    useEffect(() => {
        if (!credentialsLoading && credentials) {
            setVerify(false)
            navigate('/')
        }

        const onConnect = () => {
            console.log('Connected to server')
        }

        const onConnectError = (err) => {
            console.error('Connection error:', err)
        }

        const onMessage = (data) => {
            alert(data)
        }

        socket.on('connect', onConnect)
        socket.on('connect_error', onConnectError)
        socket.on('message', onMessage)

        return () => {
            socket.off('connect', onConnect)
            socket.off('connect_error', onConnectError)
            socket.off('message', onMessage)
        }

    }, [credentials, verify, navigate])

    const handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = values
        LoginUser({ email, password })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <>
            <div className="bg-[#121212] w-full h-screen flex flex-col justify-start items-center">
                <div className="w-full h-full flex justify-start items-center">
                    <div className="w-[70%] h-full flex justify-start items-center">
                        <img src={LoginBG} alt="BG" className='w-full h-full object-cover' />
                    </div>
                    <div className="relative w-[30%] h-full flex justify-center items-center">
                        {loginLoading || otpLoading && <Loading />}
                        {
                            verify ? <InputOTPForm isVerify={(data) => setVerify(data)} pin={(handleOtpSubmit)} /> :
                                <form
                                    onSubmit={handleLogin}
                                    className='w-full h-full flex flex-col justify-center items-center gap-[1rem] px-[4rem]'>
                                    <div className="w-full h-[5rem] flex justify-start items-center">
                                        <img src={LogoUB} alt="BG" className='w-full h-full object-contain' />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <h1 className='text-white'>Email</h1>
                                        <input autoFocus onChange={handleOnChange} type="email" required name='email' className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your email...' />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <h1 className='text-white'>Password</h1>
                                        <input onChange={handleOnChange} type="password" required name='password' className='px-[1rem] py-[.5rem] rounded-md placeholder:text-[.8rem]' placeholder='Enter your password...' />
                                    </div>
                                    <button type='submit' className={`w-full py-[.6rem] rounded-lg  ${values?.email && values?.password ? 'text-[#000000]' : 'text-[#000000]'} hover:bg-[#b00b69] hover:text-white duration-300 ease ${values?.email && values?.password ? 'bg-[#CBC300]' : 'bg-[#CBC300]'} shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.1)]`}>
                                        Login
                                    </button>
                                    <div className="w-full flex flex-col justify-start items-start">
                                        <p className='text-[.8rem] text-white'>
                                            Don't have an account? <span className='cursor-pointer text-white text-decoration-line: underline' onClick={handleSignUp}>Sign Up.</span>
                                        </p>
                                        <p className='cursor-pointer text-[.8rem] text-decoration-line: underline text-white'>
                                            Forgot password?
                                        </p>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
