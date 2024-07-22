<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import Loading from '@/components/Loading'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

const fetchAccountNo = async ({ accountid }) => {
    try {
        const res = await axios.get(`${VITE_HOST}/api/useraccount/${accountid}`, {
            headers: {
                Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
            }
        })

        return res?.data?.data?.accountno
    } catch (error) {
        console.error(error)
    }
}

const makeDeposit = async ({ account, amount, userId }) => {
    const res = await axios.post(`${VITE_HOST}/api/deposittransaction`, { account, amount }, {
        headers: {
            Authorization: `Bearer ${VITE_ADMIN_TOKEN}`,
            userId: userId
        }
    })

    return res?.data
}

export default function Deposit() {
    const { accountid } = useParams()
    const navigate = useNavigate()
    const [amount, setAmount] = useState('')

    const credentials = JSON.parse(sessionStorage.getItem('credentials') || '{}');
    if (!credentials) return navigate('/metrobank')

    const { data: account, isLoading } = useQuery({
        queryFn: () => fetchAccountNo({ accountid }),
        queryKey: ['account', { accountid }]
    });
=======
import { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header__Dashboard from '../../../components/Header__dashboard'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials'
import { makeDeposit } from '@/api/Transactions'
import { useToast } from "@/components/ui/use-toast"

export default function Deposit() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        creditAccount: '',
        amount: ''
    })

    const { data: credentials = '', isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['depositCredentials']
    })

    const userId = credentials?.userId
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

    const { mutateAsync: handleDeposit } = useMutation({
        mutationFn: makeDeposit,
        onSuccess: (data) => {
<<<<<<< HEAD
            alert(data?.message)
            navigate('/ledger')
=======
            if (data?.success) return toast({ title: "Success! 🎉", description: data?.message })
            toast({ title: "Uh, oh! Something went wrong.", description: data?.message, })
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        }
    })

    const onSubmitDeposit = (e) => {
        e.preventDefault()
<<<<<<< HEAD
        handleDeposit({ account: account, amount: amount, userId: credentials.userId })
        handleCleanUp()
    }

    const handleOnChange = (e) => {
        const { value } = e.target
        setAmount(value)
    }

    const handleCleanUp = () => {
        setAmount('')
=======
        handleDeposit({ account: values?.creditAccount, amount: values?.amount, userId })
        setValues((prev) => ({
            ...prev,
            creditAccount: '',
            amount: ''
        }))
        navigate('/ledger')
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    }

    const handleBack = () => {
        navigate('/ledger')
    }

<<<<<<< HEAD
    if(isLoading) return <Loading />
=======
    useEffect(() => {
        if (!credentialsLoading && !credentials) { navigate('/metrobank') }
    }, [credentials, navigate])
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-center p-[1rem] overflow-auto ">
                    <Header__Dashboard breadcrumbs={breadCrumbs} />
                    <form
                        onSubmit={onSubmitDeposit}
                        className='w-full h-[95%] flex flex-col justify-start items-center px-[5rem]'>
                        <div className="space-y-12 pt-[5rem] pb-[20rem]">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Deposit Details</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Please provide information for deposit.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
<<<<<<< HEAD
                                        <label htmlFor="creditaccount" className="block text-sm font-medium leading-6 text-gray-900">
=======
                                        <label htmlFor="creditAccount" className="block text-sm font-medium leading-6 text-gray-900">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                            Account No.
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">to/</span>
                                                <input
<<<<<<< HEAD
                                                    value={account}
                                                    type="text"
                                                    name="account"
                                                    id="account"
                                                    autoComplete="account"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    readOnly
=======
                                                    value={values?.creditAccount}
                                                    onChange={handleOnChange}
                                                    type="text"
                                                    name="creditAccount"
                                                    id="creditAccount"
                                                    autoComplete="creditAccount"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    required
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                            Amount
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">PHP/</span>
                                                <input
<<<<<<< HEAD
                                                    value={amount}
                                                    onChange={handleOnChange}
                                                    type="text"
                                                    id="amount"
                                                    autoComplete="amount"
=======
                                                    value={values?.amount}
                                                    onChange={handleOnChange}
                                                    type="text"
                                                    name='amount'
                                                    id="amount"
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end gap-x-6">
                                <button
                                    onClick={handleBack}
                                    className="text-sm font-semibold leading-6 text-gray-900">
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Deposit
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </>
    )
}

const breadCrumbs = [
    { title: 'View Accounts', href: '/ledger', isLink: true },
    { title: 'Deposit', isLink: false },
]