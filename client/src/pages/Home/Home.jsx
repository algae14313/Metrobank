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
            
        </div>
    )
}