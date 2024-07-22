<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header__dashboard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Profile() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        isactive: '',
        role: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetchCredentials()
    }, [])

    const fetchCredentials = async () => {
        try {
            const credentials = sessionStorage.getItem('credentials')
            if (!credentials) return navigate('/metrobank')

            const { userId } = JSON.parse(credentials)
            const res = await axios.get(`${VITE_HOST}/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })

            const name = res?.data?.data?.name
            const isactive = res?.data?.data?.isactive
            const email = res?.data?.data?.email
            const role = res?.data?.data?.role

            setValues((prev) => ({
                ...prev,
                name: name,
                isactive: isactive,
                email: email,
                role: role
            }))
            console.log(values)
        } catch (error) {
            console.error(error)
        }
    }
=======
import { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header__dashboard'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProfileDetails } from '@/api/User'
import { fetchCredentials } from '@/api/Credentials'
import { Button } from '@/components/ui/button'

export default function Profile() {
    const navigate = useNavigate()

    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['profileCredentials']
    })

    const userId = credentials?.userId

    const { data: profileDetails, isLoading: profileLoading } = useQuery({
        queryFn: () => fetchProfileDetails({ userId }),
        queryKey: ['profileDetails', { userId }],
        enabled: !!userId
    })

    useEffect(() => {
        if (!credentialsLoading && !credentials) { navigate('/metrobank') }
    }, [credentials, navigate])
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab

    const handleEdit = () => {
        navigate('/profile/updateprofile')
    }
    return (
        <>
<<<<<<< HEAD
            <div className="flex">
=======
            <div className="flex bg-white dark:bg-[#242526]">
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                <Sidebar />
                <div className="w-[80%] h-screen flex flex-col justify-start items-center p-[1rem] overflow-auto">
                    <Header breadcrumbs={breadCrumbs} />
                    <div className="w-full h-[95%] px-[20rem] py-[5rem]">
                        <div className="px-4 sm:px-0">
<<<<<<< HEAD
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Account Information</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
=======
                            <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Account Information</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-[#8f8f96]">Personal details.</p>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                        </div>
                        <div className="border-t border-gray-100 mt-[1.5rem] pb-[20rem]">
                            <dl className="divide-y divide-gray-100 ">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
<<<<<<< HEAD
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {values?.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {values?.email}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Account status</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {values?.isactive === false ? 'Inactive' : 'Active'}
                                    </dd>
                                </div>
                                {
                                    (values?.role === 'user' || values?.role === 'developer') && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Developer</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {values?.role === 'user' && 'Inactive'}
                                                {values?.role === 'developer' && 'Active'}
=======
                                    <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
                                        {profileDetails?.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
                                        {profileDetails?.email}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Account status</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
                                        {profileDetails?.isactive === false ? 'Inactive' : 'Active'}
                                    </dd>
                                </div>
                                {
                                    (profileDetails?.role === 'user' || profileDetails?.role === 'developer') && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Developer</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-white">
                                                {profileDetails?.role === 'user' && 'Inactive'}
                                                {profileDetails?.role === 'developer' && 'Active'}
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                            </dd>
                                        </div>
                                    )
                                }

                                <div className="w-full flex items-center justify-end gap-x-6 pt-[2rem]">
<<<<<<< HEAD
                                    <button
                                        onClick={handleEdit}
                                        className="rounded-md bg-[#111111] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Edit Profile
                                    </button>
=======
                                    <Button variant='secondary' onClick={handleEdit} >
                                        Edit Profile
                                    </Button>
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const breadCrumbs = [
    // { title: 'Home', href: '/', isLink: true },
    { title: 'Profile', isLink: false },
]