<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import { useEffect } from 'react'
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
import Sidebar from '../../components/Sidebar'
import Header__Dashboard from '../../components/Header__dashboard'
import SavingsIcon from '@mui/icons-material/Savings';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import axios from 'axios'
import { GroupBarChart } from '../../components/Charts'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env
import { useQuery } from '@tanstack/react-query'

const fetchAccount = async ({ userId }) => {
    try {
        const res = await axios.get(`${VITE_HOST}/api/useraccount/${userId}`, {
            headers: {
                Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
            }
        })

        if (res?.data?.success) return res?.data?.data
        return null
    } catch (error) {
        console.error(error)
    }
}
=======
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials';
import { fetchAccount } from '@/api/Accounts';
import PieChartHR from '@/components/charts/PieChart';
import AreaChart_Interactive from '@/components/charts/AreaChart__Interactive';
import BarChart_Horizontal from '@/components/charts/BarChart__Horizontal';
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

export default function Dashboard() {
    const navigate = useNavigate()

<<<<<<< HEAD
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    if (!credentials) return navigate('/metrobank')
    const { userId, role } = credentials

    const { data: carddetails, isLoading } = useQuery({
        queryFn: () => fetchAccount({ userId }),
        queryKey: ['dashboard', { userId }],
        refetchInterval: 5000
    })

    const maskAccountNumber = (accountNumber) => {
        if (accountNumber.length !== 9) return accountNumber;
        return '******' + accountNumber.slice(-3);
    };

=======
    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['credentialsDashboard']
    })

    const userId = credentials?.userId
    const role = credentials?.role

    const { data: carddetails, isLoading: cardLoading } = useQuery({
        queryFn: () => fetchAccount({ userId }),
        queryKey: ['dashboardAccount', { userId }],
        enabled: !!userId,
        refetchInterval: 5000
    })

    const maskAccountNumber = (accountNumber) => {
        if (accountNumber.length !== 9) return accountNumber;
        return '******' + accountNumber.slice(-3);
    };

    useEffect(() => {
        if (!credentialsLoading && !credentials) {
            navigate('/metrobank')
        }
    }, [credentials, navigate]);

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    return (
        <>
            <div className="flex bg-white dark:bg-[#242526]">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-auto">
                    <Header__Dashboard breadcrumbs={breadCrumbs} />
<<<<<<< HEAD
                    <div className="w-full h-[95%] flex flex-col justify-start items-start gap-[1rem]">
                        <div className="w-full h-[5%]">
                            <h1 className='text-black font-[600] text-[1.2rem]'>
                                {carddetails && ('Your Accounts')}
                                {role === 'rb' && ('Welcome')}
                                {role === 'hr' && ('Welcome')}
=======
                    <div className="w-full h-[5%] flex flex-col justify-start items-start">
                        <div className="w-full h-[5dvh] flex justify-start items-center">
                            <h1 className='text-black dark:text-white font-[600] text-[1.2rem]'>
                                {carddetails && ('Your Accounts')}
                                {role === 'rb' && ('Welcome')}
                                {role === 'hr' && ('Welcome')}
                                {role === 'admin' && ('Welcome')}
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                            </h1>
                        </div>
                        {
                            carddetails && (
                                <div className="w-full flex justify-start items-start gap-[1rem] flex-wrap">
                                    <Link
                                        to={`/carddetails`}
                                        className="cursor-pointer hover:scale-[.98] duration-300 ease w-[18rem] sm:w-[20rem] md:w-[22rem] lg:w-[24rem] h-[10rem] sm:h-[11re] md:h-[12rem] lg:h-[13rem] rounded-md shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.15)] flex flex-col justify-evenly bg-[#111111] items-start p-[1rem]">
                                        <h1 className='text-white font-[500] text-[.9rem]'>Savings Account</h1>
                                        <div className="w-full flex justify-start items-center gap-[1rem]">
                                            <SavingsIcon style={{ color: 'white', fontSize: '2rem' }} />
                                            <div className="flex flex-col justify-center items-start">
<<<<<<< HEAD
                                                <h1 className='text-white'>REGULAR {carddetails?.accountType === 'savings' && 'SAVINGS'}</h1>
                                                <h1 className='text-white'>{maskAccountNumber(carddetails?.accountno)}</h1>
=======
                                                <h1 className='text-white'>
                                                    REGULAR {carddetails?.accountType === 'savings' && 'SAVINGS'}
                                                </h1>
                                                <h1 className='text-white'>
                                                    {maskAccountNumber(carddetails?.accountno)}
                                                </h1>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <h1 className='text-white'>Current Balance</h1>
<<<<<<< HEAD
                                            <h1 className='text-white'>PHP {carddetails?.balance}</h1>
=======
                                            <h1 className='text-white'>
                                                PHP {carddetails?.balance}
                                            </h1>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
<<<<<<< HEAD
                        {
                            (role === 'hr' || role === 'rb' || role === 'it' || role === 'admin') && (
                                <div className="w-full">
                                    <GroupBarChart />
                                </div>
                            )
                        }
=======
                        <div className="w-full flex flex-col justify-start items-start py-[1rem] gap-[1rem]">
                            <div className="w-full flex justify-start items-start gap-[1rem] flex-wrap">
                                <div className="w-full flex justify-start gap-[1rem]">
                                    {(role === 'hr' || role === 'admin') && <PieChartHR />}
                                    {(role === 'rb' || role === 'admin') && <BarChart_Horizontal />}
                                </div>
                                <div className="w-full">
                                    {(role === 'it' || role === 'admin') && <AreaChart_Interactive title={`Daily transactions analysis`} subtitle={`Showing transactions for the last 6 days`} />}
                                </div>
                            </div>
                        </div>

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                    </div>
                </div>
            </div>

        </>
    )
}

const breadCrumbs = [
    // { title: 'Home', href: '/', isLink: true },
    { title: 'Dashboard', isLink: false },
]