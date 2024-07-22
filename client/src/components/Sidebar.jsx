<<<<<<< HEAD
import { useEffect, useState } from 'react'
=======
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
import GridViewIcon from '@mui/icons-material/GridView';
import { NavLink, useNavigate } from 'react-router-dom';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
<<<<<<< HEAD
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env
import { useQuery } from '@tanstack/react-query'

const fetchUserAccount = async (userId) => {
    try {
        const { userId } = JSON.parse(sessionStorage.getItem('credentials') || '{}');

        const res = await axios.get(`${VITE_HOST}/api/useraccount/${userId}`, {
            headers: {
                Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
            }
        })

        if (res?.data?.success) { return res?.data?.data }
        return null
    } catch (error) {
        console.error(error)
    }
}
=======
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials';
import { fetchAccount } from '@/api/Accounts';
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

export default function Sidebar() {
    const navigate = useNavigate()

<<<<<<< HEAD
    const { userId, role: userRole } = JSON.parse(sessionStorage.getItem('credentials') || '{}');

    if (!userId) return navigate('/metrobank')

    const { data: carddetails, isLoading } = useQuery({
        queryFn: () => fetchUserAccount(userId),
        queryKey: ['sidebarBalance', userId],
=======
    const { data: credentials, isLoading: credentialsLoading, isFetched: credentialsFetched } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['sidebarCredentials']
    })

    const userId = credentials?.userId
    const role = credentials?.role

    const { data: carddetails, isLoading: cardLoading } = useQuery({
        queryFn: () => fetchAccount({ userId }),
        queryKey: ['sidebarBalance', { userId }],
        enabled: !!userId,
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        refetchInterval: 5000
    });

    const maskAccountNumber = (accountNumber) => {
        if (accountNumber?.length !== 9) return accountNumber;
        return '******' + accountNumber.slice(-3);
    };

    const handleLogout = () => {
        sessionStorage.clear();
<<<<<<< HEAD
        navigate('/metrobank')
=======
        navigate('/unionbank')
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    };

    return (
        <>
<<<<<<< HEAD
            <div className="sm:w-[none] md:w-[none] lg:w-[20%] h-screen px-[.1rem] sm:px-[.3rem] md:px-[.5rem] lg:px-[1rem] py-[1rem] bg-[#ffffff] border-r border-gray-900/10 overflow-auto">
=======
            <div className="sm:w-[none] md:w-[none] lg:w-[20%] h-screen px-[.1rem] sm:px-[.3rem] md:px-[.5rem] lg:px-[1rem] py-[1rem] bg-[#ffffff] dark:bg-[#171717] border-r border-gray-900/10 overflow-auto">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                {
                    carddetails && (
                        <div className="rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] bg-[#111111] w-full min-h-[8rem] flex justify-center items-start flex-col px-[1rem] gap-[.5rem]">
                            <div className="w-full flex justify-start items-center gap-[.5rem]">
                                <div className="lex flex-col justify-center items-start">
                                    <h1 className='text-white'>REGULAR SAVINGS</h1>
                                    <h1 className='text-white'>{maskAccountNumber(carddetails?.accountno)}</h1>
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center">
                                <h1 className='text-white text-[.9rem]'>Balance</h1>
                                <h1 className='text-white text-[.9rem]'>PHP {carddetails?.balance}</h1>
                            </div>
                        </div>
                    )
                }

                <div className="w-full flex flex-col justify-between items-start pb-[6rem]">
                    <div className="w-full flex flex-col">
                        <div className="hnavs w-full py-[1rem] flex flex-col gap-[.2rem] justify-start items-start">
<<<<<<< HEAD
                            <NavLink to={`/`} className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <GridViewIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Dashboard
                                </h1>
                            </NavLink>
                            {
                                (userRole === 'user' || userRole === 'developer') && (
                                    <>
                                        <NavLink to='/statement' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <ReceiptLongOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                View Statement
                                            </h1>
                                        </NavLink>
                                        <NavLink to='/transfer' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <MoveDownOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Make a Transfer
                                            </h1>
=======
                            <NavLink to={`/`} className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <GridViewIcon />
                                Dashboard
                            </NavLink>
                            {
                                (role === 'user' || role === 'developer') && (
                                    <>
                                        <NavLink to='/statement' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <ReceiptLongOutlinedIcon />
                                            View Statement
                                        </NavLink>
                                        <NavLink to='/transfer' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <MoveDownOutlinedIcon />
                                            Make a transfer
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                        </NavLink>
                                    </>
                                )
                            }

                            {
<<<<<<< HEAD
                                (userRole === 'it' || userRole === 'admin') && (
                                    <NavLink to='/developers' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <CodeOutlinedIcon />
                                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                            Developers
                                        </h1>
=======
                                (role === 'it' || role === 'admin') && (
                                    <NavLink to='/developers' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <CodeOutlinedIcon />
                                        Developers
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                    </NavLink>
                                )
                            }
                            {
<<<<<<< HEAD
                                (userRole === 'hr' || userRole === 'admin') && (
                                    <NavLink to='/employees' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <SupervisorAccountOutlinedIcon />
                                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                            Employees
                                        </h1>
=======
                                (role === 'hr' || role === 'admin') && (
                                    <NavLink to='/employees' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <SupervisorAccountOutlinedIcon />
                                        Employees
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                    </NavLink>
                                )
                            }
                            {
<<<<<<< HEAD
                                (userRole === 'rb' || userRole === 'admin') && (
                                    <>
                                        <NavLink to='/ledger' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <SyncAltOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Ledger
                                            </h1>
                                        </NavLink>
                                        <NavLink to='/customers' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <AccessibilityOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Manage Customers
                                            </h1>
=======
                                (role === 'rb' || role === 'admin') && (
                                    <>
                                        <NavLink to='/ledger' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <SyncAltOutlinedIcon />
                                            Ledger
                                        </NavLink>
                                        <NavLink to='/customers' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <AccessibilityOutlinedIcon />
                                            Manage Customers
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                        </NavLink>
                                    </>
                                )
                            }
                        </div>
                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#9CA3AF] text-[.3rem] sm:text-[.5rem] md:text-[.7rem] lg:text-[.9rem]'>Settings</h1>
                        <div className="hnavs w-full py-[1rem] flex flex-col justify-start items-start gap-[.2rem]">
<<<<<<< HEAD
                            <NavLink to='/profile' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <Person2OutlinedIcon />
                                <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                    Profile
                                </h1>
                            </NavLink>
                            {
                                (userRole === 'it' || userRole === 'admin') && (
                                    <>
                                        <NavLink to='/auditlog' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <BookOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Audit Log
                                            </h1>
                                        </NavLink>
                                        <NavLink to='/security' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <GppGoodOutlinedIcon />
                                            <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                                Security
                                            </h1>
=======
                            <NavLink to='/profile' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                <Person2OutlinedIcon />
                                Profile
                            </NavLink>
                            {
                                (role === 'it' || role === 'admin') && (
                                    <>
                                        <NavLink to='/auditlog' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <BookOutlinedIcon />
                                            Audit Log
                                        </NavLink>
                                        <NavLink to='/security' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            <GppGoodOutlinedIcon />
                                            Security
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                        </NavLink>
                                    </>
                                )
                            }
                            {
<<<<<<< HEAD
                                (userRole === 'developer' || userRole === 'admin') && (
                                    <NavLink to='/apikeys' className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <HttpOutlinedIcon />
                                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#3D4751] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                                            API Keys
                                        </h1>
=======
                                (role === 'developer' || role === 'admin') && (
                                    <NavLink to='/apikeys' className="w-full text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        <HttpOutlinedIcon />
                                        API Keys
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                    </NavLink>
                                )
                            }
                        </div>
                    </div>
                    <div onClick={handleLogout} className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1] cursor-pointer hover:bg-[#323232] duration-300 ease">
                        <ExitToAppOutlinedIcon style={{color: 'white'}} />
                        <button className='hidden sm:hidden md:hidden lg:block text-[#ffffff] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem]'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
