import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get('/api/user/current', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    setUserRole(response.data.user.role);
                }
            } catch (error) {
                console.error('Error fetching user details', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className={`h-screen px-4 py-4 bg-[#111d52] flex flex-col justify-between transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-1/5'}`}>
            <div>
                <div className="w-full h-16 flex justify-between items-center mb-4">
                    <h1 className={`text-white text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Metrobank</h1>
                    <MenuIcon 
                        style={{ cursor: 'pointer', fontSize: '2rem', color: 'white' }} 
                        onClick={handleCollapse} 
                    />
                </div>
                <div className="flex-grow">
                    <div className="w-full flex flex-col gap-2">
                        <NavLink to='/' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                            <GridViewIcon />
                            <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</h1>
                        </NavLink>
                        {userRole === 'user' || userRole === 'developer' ? (
                            <>
                                <NavLink to='/transactions' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <ReceiptLongOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Transactions</h1>
                                </NavLink>
                                <NavLink to='/ledger' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <SyncAltOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Ledger</h1>
                                </NavLink>
                                <NavLink to='/transfer' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <MoveDownOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Make a Transfer</h1>
                                </NavLink>
                            </>
                        ) : null}
                        {userRole === 'it' || userRole === 'admin' ? (
                            <NavLink to='/developers' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                <CodeOutlinedIcon />
                                <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Developers</h1>
                            </NavLink>
                        ) : null}
                        {userRole === 'hr' || userRole === 'admin' ? (
                            <NavLink to='/employees' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                <SupervisorAccountOutlinedIcon />
                                <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Employees</h1>
                            </NavLink>
                        ) : null}
                        {userRole === 'rb' || userRole === 'admin' ? (
                            <>
                                <NavLink to='/customers' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <AccessibilityOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Customers</h1>
                                </NavLink>
                                <NavLink to='/ledger' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <SyncAltOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Ledger</h1>
                                </NavLink>
                                <NavLink to='/deposit' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <AddCardOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Deposit</h1>
                                </NavLink>
                                <NavLink to='/withdrawal' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <HourglassEmptyOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Withdrawal</h1>
                                </NavLink>
                            </>
                        ) : null}
                        <h1 className={`${isCollapsed ? 'hidden' : 'block'} text-[#9CA3AF] text-[.3rem] sm:text-[.5rem] md:text-[.7rem] lg:text-[.9rem]`}>Settings</h1>
                        <NavLink to='/account' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                            <Person2OutlinedIcon />
                            <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Account</h1>
                        </NavLink>
                        {userRole === 'it' || userRole === 'admin' ? (
                            <>
                                <NavLink to='/auditlog' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <BookOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Audit Log</h1>
                                </NavLink>
                                <NavLink to='/security' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <GppGoodOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Security</h1>
                                </NavLink>
                            </>
                        ) : null}
                        {userRole === 'developer' || userRole === 'admin' ? (
                            <NavLink to='/apikeys' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                <HttpOutlinedIcon />
                                <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>API Keys</h1>
                            </NavLink>
                        ) : null}
                    </div>
                </div>
            </div>
            <div onClick={handleLogout} className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white cursor-pointer hover:bg-[#152466] duration-300 ease mt-auto">
                <ExitToAppOutlinedIcon />
                <button className={`${isCollapsed ? 'hidden' : 'block'}`}>Logout</button>
            </div>
        </div>
    );
}
