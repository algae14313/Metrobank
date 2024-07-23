import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import SolanaPic from '../../assets/SolanaPic.webp'
import { io } from 'socket.io-client'
import Announcement from '@/components/Announcement'
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials'
const { VITE_HOST } = import.meta.env

const socket = io(VITE_HOST, {
    transports: ['websocket'],
    debug: true
});

export default function Home() {
    const navigate = useNavigate()
    const [announcement, setAnnouncement] = useState('')
    
    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['homeCredentials']
    })

    useEffect(() => {
        if (credentials && !credentialsLoading) { navigate('/') }

        const onConnect = () => {
            console.log('Connected to server')
        }

        const onConnectError = (err) => {
            console.error('Connection error:', err)
        }

        const onMessage = (data) => {
            try {
                setAnnouncement(data)
            } catch (error) {
                console.error(error)
            } finally {
                setTimeout(() => {
                    setAnnouncement('')
                }, 7000);
            }
        }

        socket.on('connect', onConnect)
        socket.on('connect_error', onConnectError)
        socket.on('message', onMessage)

        return () => {
            socket.off('connect', onConnect)
            socket.off('connect_error', onConnectError)
            socket.off('message', onMessage)
        }
    }, [credentials, navigate])

    const sendMessage = () => {
        socket.emit('message', 'Sound Check, sound check...')
    }

    return (
        <div className='w-full h-screen flex justify-start items-center flex-col bg-[#121212]'>
            <Header__Home />
            {/* <div className="w-full h-full p-[5rem]">
                <img src={test} alt="asd" className='w-full h-full object-cover' />
            </div> */}
            {/* <div className="w-full h-full flex justify-center items-center gap-[7rem]">
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className='text-[2rem] font-bold'>Department</h1>
                    <h1>ADMIN</h1>
                    <h1>HUMAN RESOURCE</h1>
                    <h1>IT DEPARTMENT</h1>
                    <h1>RETAIL BANKING</h1>
                    <h1>DEVELOPER</h1>
                    <h1>USER</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className='text-[2rem] font-bold'>Email</h1>
                    <h1>admin@admin.com</h1>
                    <h1>hr@hr.com</h1>
                    <h1>it@it.com</h1>
                    <h1>rb@rb.com</h1>
                    <h1>dev@dev.com</h1>
                    <h1>user@user.com</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className='text-[2rem] font-bold'>Password</h1>
                    <h1>admin</h1>
                    <h1>hr</h1>
                    <h1>it</h1>
                    <h1>rb</h1>
                    <h1>dev</h1>
                    <h1>user</h1>
                </div>
            </div>
            <marquee width="60%" direction="right" behavior="alternate" height="100px">
                <h1 className='text-[2rem] font-bold px-[3rem]' >
                    ANO DAW ANO DAW ANO DAW ANO DAW ANO DAW 
                </h1>
            </marquee> */}
        </div>
    )
}
