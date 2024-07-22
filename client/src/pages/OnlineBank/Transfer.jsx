import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header__dashboard'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import axios from 'axios'
import { AlertDialogs } from '@/components/AlertDialog'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import Loading from '@/components/Loading'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Transfer() {
=======
import { AlertDialogs } from '@/components/AlertDialog'
import { useToast } from "@/components/ui/use-toast"
import Loading from '@/components/Loading'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchTransfer } from '@/api/Transactions'
import { fetchAccount } from '@/api/Accounts'
import { fetchCredentials } from '@/api/Credentials'

export default function Transfer() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isDialog, setDialog] = useState(false)
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    const [values, setValues] = useState({
        debitAccount: '',
        creditAccount: '',
        amount: ''
    })
<<<<<<< HEAD
    const [isDialog, setDialog] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/metrobank')

            const { userId } = JSON.parse(credentials)

            const res = await axios.get(`${VITE_HOST}/api/useraccount/${userId}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const accountno = res?.data?.data?.accountno

            setValues((prev) => ({
                ...prev,
                debitAccount: accountno
            }))
        } catch (error) {
            console.error(error)
        }
    }
=======

    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['transferCredentials']
    })

    const userId = credentials?.userId
    const token = credentials?.token

    const { data: account, isLoading: accountLoading } = useQuery({
        queryFn: () => fetchAccount({ userId }),
        queryKey: ['transferTransaction', { userId }],
        enabled: !!userId
    })

    const debitAccount = account?.accountno

    const { mutateAsync: transfer, isPending: transferLoading } = useMutation({
        mutationFn: fetchTransfer,
        onSuccess: (data) => {
            if (data?.success) return toast({ title: "Success! 🎉", description: data?.message })
            toast({ title: "Uh, oh! Something went wrong.", description: data?.message, })
        }
    })
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

    const handleTransfer = async (e) => {
        try {
            e.preventDefault()
<<<<<<< HEAD
            setLoading(true)
            const credentials = sessionStorage.getItem('credentials')
            const { userId, token } = JSON.parse(credentials)

            const res = await axios.post(`${VITE_HOST}/api/transfertransaction`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId
                }
            })

            console.log(res?.data)

            if (res?.data?.success) return toast({ title: "Success! 🎉", description: res?.data?.message })
            toast({ title: "Uh, oh! Something went wrong.", description: res?.data?.message, })

=======
            const { creditAccount, amount } = values
            transfer({ debitAccount, creditAccount, amount, token, userId })
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        } catch (error) {
            console.error(error)
        } finally {
            handleCleanUp()
            setDialog(false)
<<<<<<< HEAD
            setLoading(false)
=======
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeDialog = (e) => {
<<<<<<< HEAD
        if (values?.creditAccount === '' || values?.amount === '') return
        e.preventDefault()
=======
        e.preventDefault()
        if (values?.creditAccount === '' || values?.amount === '') return
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        setDialog(true)
    }

    const handleDialogCancel = () => {
        setDialog(false)
    }

    const handleCleanUp = () => {
        setValues((prev) => ({
            ...prev,
            creditAccount: '',
            amount: ''
        }))
    }

<<<<<<< HEAD
=======
    useEffect(() => {
        if (!credentialsLoading && !credentials) { navigate('/metrobank') }
    }, [credentials, navigate])

>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    return (
        <>
            <div className="flex">
                <Sidebar />
<<<<<<< HEAD
                <Toaster />
                <AlertDialogs open={isDialog} onClose={handleDialogCancel} onConfirm={handleTransfer} />
                {isLoading && <Loading />}
=======
                <AlertDialogs open={isDialog} onClose={handleDialogCancel} onConfirm={handleTransfer} content={` This action cannot be undone. This will permanently transfer funds to another account.`} />
                {(accountLoading || transferLoading) && <Loading />}
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                <div className="w-[80%] h-screen flex flex-col justify-start items-center p-[1rem] overflow-auto ">
                    <Header breadcrumbs={breadCrumbs} />
                    <form className='w-full h-[95%] flex flex-col justify-start items-center px-[5rem]'>
                        <div className="space-y-12 pt-[5rem] pb-[20rem]">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Account Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Please provide information in who you transfer.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="debitAccount" className="block text-sm font-medium leading-6 text-gray-900">
                                            Debit Account
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">from/</span>
                                                <input
                                                    readOnly
<<<<<<< HEAD
                                                    value={values?.debitAccount ? values?.debitAccount : 'No active account'}
                                                    onChange={handleOnChange}
=======
                                                    value={debitAccount ? debitAccount : 'No active account'}
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                                    required
                                                    type="text"
                                                    name="debitAccount"
                                                    id="debitAccount"
                                                    autoComplete="debitAccount"
                                                    className="block flex-1 border-0 bg-transparent px-[.7rem] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="creditAccount" className="block text-sm font-medium leading-6 text-gray-900">
                                            Credit Account
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">to/</span>
                                                <input
                                                    value={values?.creditAccount}
                                                    onChange={handleOnChange}
                                                    required
                                                    type="text"
                                                    name="creditAccount"
                                                    id="creditAccount"
                                                    autoComplete="creditAccount"
                                                    className="block flex-1 border-0 bg-transparent px-[.7rem] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
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
                                                    value={values?.amount}
                                                    onChange={handleOnChange}
                                                    required
                                                    type="text"
                                                    name="amount"
                                                    id="amount"
                                                    autoComplete="amount"
                                                    className="block flex-1 border-0 bg-transparent px-[.7rem] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="remarks" className="block text-sm font-medium leading-6 text-gray-900">
                                            Remarks
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="remarks"
                                                name="remarks"
                                                rows={3}
                                                className="block w-full rounded-md border-0 px-[.7rem] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your remarks.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-end gap-x-6">
                                <button
                                    onClick={handleChangeDialog}
                                    className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Transfer
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
    // { title: 'Home', href: '/', isLink: true },
    { title: 'Make a Transfer', isLink: false },
]