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
            {/* <Announcement color={`#000000`} content={announcement} />
            <div className="overflow-hidden w-full h-full flex flex-col justify-evenly items-center relative">
                <img src={SolanaPic} alt="Solana Pic" className='absolute top-[-2rem] left-[30rem] sm:left-[25rem] md:left-[20rem] lg:-left-[15rem] w-[20rem] h-[10rem] scale-[5]' />
                <img src={SolanaPic} alt="Solana Pic" className='absolute top-[10rem] right-[-30rem] sm:right-[-25rem] md:right-[-20rem] lg:right-[-15rem] w-[20rem] h-[10rem] scale-[5]' />
                <div className="absolute w-full h-screen bg-[rgba(0,0,0,0.54)] flex justify-center items-center z-[2]">
                    <h1 className='text-white text-[4rem] text-bold'>Maintenance break, we will be right back</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-[1rem]">
                    <h1 className='text-white text-[4rem] font-[600] text-center z-[1]'>
                        Powerful for developers. <br /> Fast for everyone.
                    </h1>
                    <div className="w-full">
                        <h1 className='text-[#87878e] text-center'>
                            Bring blockchain to the people. Metrobank supports experiences <br /> for power users, new consumers, and everyone in between.
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
            </div> */}
        </div>
    )
}
