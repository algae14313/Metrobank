<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
=======
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
import Header__Home from '../../components/Header__Home'
import SolanaPic from '../../assets/SolanaPic.webp'
import { io } from 'socket.io-client'
import Announcement from '@/components/Announcement'
<<<<<<< HEAD
=======
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials'
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
const { VITE_HOST } = import.meta.env

const socket = io(VITE_HOST, {
    transports: ['websocket'],
    debug: true
});

export default function Home() {
<<<<<<< HEAD
    const [isAnnounce, setAnnounce] = useState(false)
    const [announcement, setAnnouncement] = useState('')

    useEffect(() => {
=======
    const navigate = useNavigate()
    const [announcement, setAnnouncement] = useState('')
    
    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['homeCredentials']
    })

    useEffect(() => {
        if (credentials && !credentialsLoading) { navigate('/') }

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
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
<<<<<<< HEAD
    }, [])

    const sendMessage = () => {
        socket.emit('message', '')
=======
    }, [credentials, navigate])

    const sendMessage = () => {
        socket.emit('message', 'Sound Check, sound check...')
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    }

    return (
        <div className='w-full h-screen flex justify-start items-center flex-col bg-[#121212]'>
            <Header__Home />
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
            <Announcement color={`#000000`} content={announcement} />
            <div className="overflow-hidden w-full h-full flex flex-col justify-evenly items-center relative">
                <img src={SolanaPic} alt="Solana Pic" className='absolute top-[-2rem] left-[30rem] sm:left-[25rem] md:left-[20rem] lg:-left-[15rem] w-[20rem] h-[10rem] scale-[5]' />
                <img src={SolanaPic} alt="Solana Pic" className='absolute top-[10rem] right-[-30rem] sm:right-[-25rem] md:right-[-20rem] lg:right-[-15rem] w-[20rem] h-[10rem] scale-[5]' />
                {/* <div className="absolute w-full h-screen bg-[rgba(0,0,0,0.54)] flex justify-center items-center z-[2]">
                    <h1 className='text-white text-[4rem] text-bold'>Maintenance break, we will be right back</h1>
                </div> */}
                <div className="w-full flex flex-col justify-center items-center gap-[1rem]">
                    <h1 className='text-white text-[4rem] font-[600] text-center z-[1]'>
                        Powerful for developers. <br /> Fast for everyone.
                    </h1>
                    <div className="w-full">
                        <h1 className='text-[#87878e] text-center'>
<<<<<<< HEAD
                            Bring blockchain to the people. Metrobank supports experiences <br /> for power users, new consumers, and everyone in between.
=======
                            Bring blockchain to the people. UnionBank supports experiences <br /> for power users, new consumers, and everyone in between.
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                        </h1>
                    </div>
                    <div className="w-full flex justify-center items-center gap-[1rem] z-[1]">
                        <Link to={`https://spiritual-wire-287.notion.site/UnionBank-API-Documentation-6a2928ba55e5442b91423fda3ebd8f78?pvs=4`}
                            className='text-white px-[1.7rem] py-[.7rem] border-white border-[1px] rounded-3xl hover:bg-white hover:text-black'
                            target='_blank'
                        >
                            READ DOCS
                        </Link>
                        <button onClick={sendMessage} className='text-white'>
                            Test Broadcast
                        </button>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
=======
=======
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
>>>>>>> 5e3010578ff8f97f848176b4e9353934d9defc22
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        </div>
    )
}
