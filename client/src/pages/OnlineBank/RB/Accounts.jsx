<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import { useEffect, useState } from 'react'
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import DataGrids from '../../../components/DataGrids'
<<<<<<< HEAD
import { Button } from '@mui/material'
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Accounts() {
    const [values, setValues] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials();
        fetchRBAccounts()
    }, []);

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/metrobank')
        } catch (error) {
            console.error(error)
        }
    }

    const fetchRBAccounts = async () => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/rbaccounts`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            const accounts = res?.data?.data
            const formattedData = accounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?.user?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                balance: acc?.balance
            }))
            setValues(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChangeSearch = async (e) => {
        try {
            const { value } = e.target
            if (value === '') return fetchRBAccounts()

            const res = await axios.get(`${VITE_HOST}/api/accounts/${value}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            const accounts = res?.data?.data
            const formattedData = accounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?.user?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                balance: acc?.balance
            }))
            setValues(formattedData)
        } catch (error) {
            console.error(error)
        }
=======
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials'
import { fetchRBAccounts, SearchRbAccounts } from '@/api/Accounts'
import { Button } from '@/components/ui/button'
import '../css/Accounts.css'

export default function Accounts() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['accountsCredentials']
    })

    const { data: rbaccounts } = useQuery({
        queryFn: () => fetchRBAccounts(),
        queryKey: ['accountsRbAccounts']
    })

    const { data: searchrbaccounts } = useQuery({
        queryFn: () => SearchRbAccounts(search),
        queryKey: ['searchRbAccounts', search],
        enabled: !!search
    })

    const handleOnChangeSearch = (e) => {
        const { value } = e.target
        setSearch(value)
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    }

    const handleViewAccount = (e) => {
        navigate(`/ledger/${e}`)
    }

    const handleDeposit = (e) => {
        navigate(`/ledger/deposit/${e}`)
    }

    const handleWithdraw = (e) => {
        navigate(`/ledger/withdrawal/${e}`)
    }

<<<<<<< HEAD
=======
    useEffect(() => {
        if (!credentials && !credentialsLoading) { navigate('/metrobank') }
    }, [credentials, navigate]);

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    const renderViewCell = (params) => {
        return (
            <div className="w-full h-full flex justify-evenly items-center">
                <div>
<<<<<<< HEAD
                    <Button onClick={() => handleViewAccount(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
=======
                    <Button variant='secondary' onClick={() => handleViewAccount(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                        <h1>View Statement</h1>
                    </Button>
                </div>

<<<<<<< HEAD
                <div>
                    <Button onClick={() => handleDeposit(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
                        <h1>Deposit</h1>
                    </Button>
                    <Button onClick={() => handleWithdraw(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
=======
                <div className='flex flex-col gap-[.5rem]'>
                    <Button variant='secondary' onClick={() => handleDeposit(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
                        <h1>Deposit</h1>
                    </Button>
                    <Button variant='secondary' onClick={() => handleWithdraw(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                        <h1>Withdraw</h1>
                    </Button>
                </div>

            </div>

        );
    };

    const UserColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'accountno',
            headerName: 'Account No.',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Full Name',
            type: 'number',
            width: 350,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 450,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderViewCell
        }
    ]

    return (
        <>
<<<<<<< HEAD
            <div className="flex">
=======
            <div className="flex bg-white dark:bg-[#242526]">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-auto">
                    <Header__Dashboard breadcrumbs={breadCrumbs} />
                    <div className="w-full h-[95%] flex flex-col justify-start items-start gap-[1rem]">
                        <div className="w-full h-[5%]">
<<<<<<< HEAD
                            <h1 className='text-black font-[600] text-[1.2rem]'>
=======
                            <h1 className='text-black dark:text-white font-[600] text-[1.2rem]'>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                Account Holders
                            </h1>
                        </div>
                        <div className="w-full h-[5%] flex justify-start items-center gap-[1rem]">
<<<<<<< HEAD
                            <h1>
=======
                            <h1 className='text-black dark:text-white'>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                Search
                            </h1>
                            <input
                                onChange={handleOnChangeSearch}
                                type="text"
                                className="block w-[20rem] rounded-md border-0 px-[.7rem] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                placeholder='Search here...'
                            />
                            {/* <Button>
                                <SearchIcon />
                            </Button> */}
                        </div>
                        <div className="w-full h-[80%]">
<<<<<<< HEAD
                            <DataGrids columnsTest={UserColumns} rowsTest={values} descCol={`id`} colVisibility={{ id: false }} />
=======
                            <DataGrids columnsTest={UserColumns} rowsTest={search === '' ? rbaccounts || [] : searchrbaccounts || []} descCol={`id`} colVisibility={{ id: false }} />
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const breadCrumbs = [
    // { title: 'Home', href: '/', isLink: true },
    { title: 'View Accounts', isLink: false },
]