<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import { useEffect, useState } from 'react'
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard';
import DataGrids from '../../../components/DataGrids';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../../components/Toggle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
<<<<<<< HEAD
import TabPanel from '@mui/lab/TabPanel';
import { Button } from '@mui/material'
import axios from 'axios'
=======
import TabPanel from '@mui/lab/TabPanel'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { fetchCredentials } from '@/api/Credentials';
import { fetchRBUsers, SearchRBUsers } from '@/api/User';
import { CustomerfetchRBAccounts, CustomersSearchRBAccounts } from '@/api/Accounts';
import { Button } from '@/components/ui/button';
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Customers() {
    const [value, setValue] = useState('1');
<<<<<<< HEAD
=======
    const [searchIdRbUser, setSearchIdRbUser] = useState('')
    const [searchIdRbAccounts, setSearchIdRbAccounts] = useState('')
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    const [details, setDetails] = useState([])
    const [accounts, setAccounts] = useState([])
    const navigate = useNavigate()

<<<<<<< HEAD
    useEffect(() => {
        fetchCredentials()
        fetchRBUsers()
        fethcRBAccounts()
    }, [])

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/metrobank')

        } catch (error) {
            console.error(error)
        }
    }

    const fetchRBUsers = async () => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/rbusers`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const users = res?.data?.data
            const formattedData = users.map((user, index) => ({
                id: index + 1,
                uid: user?._id,
                name: user?.name,
                email: user?.email,
                mobileno: user?.mobileno,
                isactive: user?.isactive
            }))
            setDetails(formattedData)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChangeRBUsers = async (e) => {
        try {
            const { value } = e.target
            if (value === '') return fetchRBUsers()

            const res = await axios.get(`${VITE_HOST}/api/searchrbusers/${value}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const users = res?.data?.data

            const formattedData = users.map((user, index) => ({
                id: index + 1,
                uid: user?._id,
                name: user?.name,
                email: user?.email,
                mobileno: user?.mobileno,
                isactive: user?.isactive
            }))
            setDetails(formattedData)
=======
    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['credentialsCustomers']
    })

    const { data: rbusers, isLoading: rbusersLoading, refetch: refetchRbUsers } = useQuery({
        queryFn: () => fetchRBUsers(),
        queryKey: ['rbusers']
    })

    const { data: searchrbusers, isLoading: searchrbusersLoading } = useQuery({
        queryFn: () => SearchRBUsers(searchIdRbUser),
        queryKey: ['searchRBUsers', searchIdRbUser],
        enabled: !!searchIdRbUser,
        staleTime: searchIdRbUser ? Infinity : 0
    })



    const { data: rbaccounts, isLoading: rbaccountsLoading, refetch: refetchRbAccounts } = useQuery({
        queryFn: () => CustomerfetchRBAccounts(),
        queryKey: ['customerFetchRbAccounts']
    })

    const { data: searchrbaccounts, isLoading: searchrbaccountsLoading } = useQuery({
        queryFn: () => CustomersSearchRBAccounts(searchIdRbAccounts),
        queryKey: ['CustomerSearchRBAccounts', searchIdRbAccounts],
        enabled: !!searchIdRbAccounts,
        staleTime: searchIdRbAccounts ? Infinity : 0
    })

    useEffect(() => {
        if (!credentialsLoading && !credentials) { navigate('/metrobank') }
        if (value === '1') {
            refetchRbUsers();
        } else {
            refetchRbAccounts();
        }
    }, [credentials, value, navigate])

    const handleOnChangeRBUsers = (e) => {
        try {
            const { value } = e.target
            setSearchIdRbUser(value)
            if (value === '') { refetchRbUsers() }
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        } catch (error) {
            console.error(error)
        }
    }

<<<<<<< HEAD
    const fethcRBAccounts = async () => {
        try {

            const res = await axios.get(`${VITE_HOST}/api/rbaccounts`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const RBaccounts = res?.data?.data
            const formattedData = RBaccounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                email: acc?.user?.email,
                mobileno: acc?.user?.mobileno,
                accountactive: acc?.isactive
            }))
            setAccounts(formattedData)

        } catch (error) {
            console.error(error)
        }
    }

    const handleOnChangeRBAccounts = async (e) => {
        try {
            const { value } = e.target
            if (value === '') return fethcRBAccounts()

            const res = await axios.get(`${VITE_HOST}/api/searchrbaccounts/${value}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const RBaccounts = res?.data?.data
            const formattedData = RBaccounts.map((acc, index) => ({
                id: index + 1,
                uid: acc?._id,
                accountno: acc?.accountno,
                name: acc?.user?.name,
                email: acc?.user?.email,
                mobileno: acc?.user?.mobileno,
                accountactive: acc?.isactive
            }))
            setAccounts(formattedData)
=======
    const handleOnChangeRBAccounts = (e) => {
        try {
            const { value } = e.target
            setSearchIdRbAccounts(value)
            if (value === '') { refetchRbAccounts() }
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event, newValue) => {
        try {
            setValue(newValue);
<<<<<<< HEAD
        } catch (error) {
            console.error(error)
        } finally {
            if (value == '1') {
                fetchRBUsers()
            } else if (value === '2') {
                fethcRBAccounts()
            }
=======
            if (newValue === '1') {
                refetchRbUsers();
                setSearchIdRbUser('');
            } else {
                refetchRbAccounts();
                setSearchIdRbAccounts('');
            }
        } catch (error) {
            console.error(error)
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        }
    }

    const handleOpenAccount = async (name) => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            const { userId: rbid } = JSON.parse(credentials)
            const res = await axios.post(`${VITE_HOST}/api/createaccount`, { userId: name, accountType: 'savings', rbid: rbid }, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            if (res?.data?.success) return alert(res?.data?.message)
            alert(res?.data?.message)
        } catch (error) {
            console.error(error)
<<<<<<< HEAD
        } finally {
            fetchRBUsers()
            fethcRBAccounts()
=======
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        }
    }

    const renderIsActiveRBUsersToggle = (params) => {
        const [isActive, setIsActive] = useState(params.row.isactive);

        const handleUpdateActiveUsers = async (e) => {
            setIsActive(e);
            try {
                const credentials = sessionStorage.getItem('credentials')
                const { userId } = JSON.parse(credentials)
                await axios.post(`${VITE_HOST}/api/updateactiveuser/${params.row.uid}`,
                    {
                        isactive: e,
                        rbid: userId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${VITE_ADMIN_TOKEN}`,
                        }
                    });
            } catch (error) {
                console.error('Error updating active status:', error);
            }
        };
        return (
            <div className="w-full h-full flex justify-center items-start">
                <Toggle
                    isCheck={isActive}
                    returnCheck={handleUpdateActiveUsers}
                />
            </div>

        )
    }

    const renderIsActiveRBAccountsToggle = (params) => {
        const [isActiveAcc, setIsActiveAcc] = useState(params.row.accountactive);

        const handleUpdateActiveAccounts = async (e) => {
            setIsActiveAcc(e);
            try {
                const credentials = sessionStorage.getItem('credentials')
                const { userId } = JSON.parse(credentials)
                await axios.post(`${VITE_HOST}/api/updateactiveaccount/${params.row.uid}`,
                    {
                        isactive: e,
                        rbid: userId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${VITE_ADMIN_TOKEN}`,
                        }
                    });
            } catch (error) {
                console.error('Error updating active status:', error);
            }
        };
        return (
            <div className="w-full h-full flex justify-center items-start">
                <Toggle
                    isCheck={isActiveAcc}
                    returnCheck={handleUpdateActiveAccounts}
                />
            </div>

        )
    }

    const renderActionButtons = (params) => {
        return (
            <div className="w-full h-full flex justify-center items-center">
<<<<<<< HEAD
                <Button onClick={() => handleOpenAccount(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
=======
                <Button variant='secondary' onClick={() => handleOpenAccount(params?.row?.uid)} className="flex justify-center items-center hover:scale-[.98] duration-300 ease">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                    <h1>Open Account</h1>
                </Button>
            </div>
        );
    };

    const CustomerColumns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 90,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Full Name',
            width: 250,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'mobileno',
            headerName: 'Mobile No.',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'isactive',
            headerName: 'Active',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderIsActiveRBUsersToggle
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderActionButtons
        }
    ]

    const AccountColumns = [
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
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'number',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'mobileno',
            headerName: 'Mobile No.',
            width: 200,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'isactive',
            headerName: 'Active',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: renderIsActiveRBAccountsToggle
        }
    ]

    return (
        <>
            <div className="flex bg-white dark:bg-[#242526]">
                <Sidebar />
                <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[80%] h-screen flex flex-col justify-start items-start p-[1rem] overflow-hidden">
                    <Header__Dashboard breadcrumbs={breadCrumbs} />
                    <div className="w-full h-[5%]">
<<<<<<< HEAD
                        <h1 className='text-black font-[600] text-[1.2rem]'>
=======
                        <h1 className='text-black dark:text-white font-[600] text-[1.2rem]'>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                            Manage
                        </h1>
                    </div>
                    <TabContext value={value}>
                        <div className="w-full h-[7.5%] overflow-hidden">
                            <TabList onChange={handleChange}>
                                <Tab label="Registered Users" value="1" style={{ fontWeight: '500' }} />
                                <Tab label="Account Holders" value="2" style={{ fontWeight: '500' }} />
                            </TabList>
                        </div>

                        <TabPanel value="1" className='w-full h-[82%]'>
                            <div className="w-full h-[5%] flex justify-between items-center pt-[.5rem] pb-[2rem]">
                                <div className="flex justify-start items-center gap-[1rem]">
<<<<<<< HEAD
                                    <h1>
=======
                                    <h1 className='text-black dark:text-white'>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                        Search
                                    </h1>
                                    <input
                                        onChange={handleOnChangeRBUsers}
                                        type="text"
                                        className="block w-[20rem] rounded-md border-0 px-[.7rem] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        placeholder='Search here...'
                                    />
                                </div>
                                <div className="w-full flex items-center justify-end gap-x-3">
                                    <Link
                                        to={`/customers/addcustomer`}
<<<<<<< HEAD
                                        className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
=======
                                        className="rounded-md bg-[#4e4f50] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                    >
                                        Open Customer
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full h-[90%]">
<<<<<<< HEAD
                                <DataGrids columnsTest={CustomerColumns} rowsTest={details} descCol={`id`} />
=======
                                <DataGrids columnsTest={CustomerColumns} rowsTest={searchIdRbUser === '' ? rbusers || [] : searchrbusers || []} descCol={`id`} />
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                            </div>
                        </TabPanel>
                        <TabPanel value="2" className='w-full h-[82%]'>
                            <div className="w-full h-[5%] flex justify-between items-center pt-[.5rem] pb-[2rem]">
                                <div className="flex justify-start items-center gap-[1rem]">
<<<<<<< HEAD
                                    <h1>
=======
                                    <h1 className='text-black dark:text-white'>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                        Search
                                    </h1>
                                    <input
                                        onChange={handleOnChangeRBAccounts}
                                        type="text"
                                        className="block w-[20rem] rounded-md border-0 px-[.7rem] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        placeholder='Search here...'
                                    />
                                </div>
                            </div>
                            <div className="w-full h-[90%]">
<<<<<<< HEAD
                                <DataGrids columnsTest={AccountColumns} rowsTest={accounts} descCol={`accountno`} colVisibility={{ id: false }} />
=======
                                <DataGrids columnsTest={AccountColumns} rowsTest={searchIdRbAccounts === '' ? rbaccounts || [] : searchrbaccounts || []} descCol={`accountno`} colVisibility={{ id: false }} />
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
            </div >
        </>
    )
}

const breadCrumbs = [
    // { title: 'Home', href: '/', isLink: true },
    { title: 'Customers', isLink: false },
]