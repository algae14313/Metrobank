import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
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
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';

export default function Sidebar() {
    const [userRole, setUserRole] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCredentials();
    }, []);

    const fetchCredentials = () => {
        const credentials = sessionStorage.getItem('credentials');
        if (!credentials) return navigate('/metrobank');
        const { role } = JSON.parse(credentials);
        setUserRole(role);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <div className={`h-screen px-1 py-4 bg-[#ffffff] border-r border-gray-900/10 overflow-auto transition-width duration-300 ${isCollapsed ? 'w-[5%]' : 'lg:w-[20%]'}`}>
                <div className="w-full h-[8%] flex justify-center items-center lg:justify-between scale-70 sm:scale-70 md:scale-90 lg:scale-100 py-4">
                    <h1 className={`hidden lg:block text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                        {userRole === 'admin' && 'Administrator'}
                        {userRole === 'hr' && 'Human Resource'}
                        {userRole === 'it' && 'IT Department'}
                        {userRole === 'rb' && 'Retail Banking'}
                        {userRole === 'developer' && 'Metrobank'}
                        {userRole === 'user' && 'Metrobank'}
                    </h1>
                    <MenuIcon onClick={toggleSidebar} style={{ cursor: 'pointer', fontSize: '2rem' }} />
                </div>
                <div className="w-full flex flex-col justify-between items-start pb-[6rem]">
                    <div className="w-full flex flex-col">
                        <div className="hnavs w-full py-4 flex flex-col gap-1 justify-start items-start">
                            <NavLink to='/' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                <GridViewIcon />
                                <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                    Dashboard
                                </h1>
                            </NavLink>
                            {(userRole === 'user' || userRole === 'developer') && (
                                <>
                                    <NavLink to='/statement' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <ReceiptLongOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            View Statement
                                        </h1>
                                    </NavLink>
                                    <NavLink to='/transfer' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <MoveDownOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Make a Transfer
                                        </h1>
                                    </NavLink>
                                </>
                            )}
                            {(userRole === 'it' || userRole === 'admin') && (
                                <NavLink to='/developers' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                    <CodeOutlinedIcon />
                                    <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                        Developers
                                    </h1>
                                </NavLink>
                            )}
                            {(userRole === 'hr' || userRole === 'admin') && (
                                <NavLink to='/employees' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                    <SupervisorAccountOutlinedIcon />
                                    <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                        Employees
                                    </h1>
                                </NavLink>
                            )}
                            {(userRole === 'rb' || userRole === 'admin') && (
                                <>
                                    <NavLink to='/ledger' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <SyncAltOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Ledger
                                        </h1>
                                    </NavLink>
                                    <NavLink to='/deposit' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <AddCardOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Deposit
                                        </h1>
                                    </NavLink>
                                    <NavLink to='/withdrawal' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <HourglassEmptyOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Withdrawal
                                        </h1>
                                    </NavLink>
                                    <NavLink to='/customers' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <AccessibilityOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Manage Customers
                                        </h1>
                                    </NavLink>
                                </>
                            )}
                        </div>
                        <h1 className={`hidden lg:block text-[#9CA3AF] text-[0.3rem] sm:text-[0.5rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>Settings</h1>
                        <div className="hnavs w-full py-4 flex flex-col justify-start items-start gap-1">
                            <NavLink to='/profile' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                <Person2OutlinedIcon />
                                <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                    Profile
                                </h1>
                            </NavLink>
                            {(userRole === 'it' || userRole === 'admin') && (
                                <>
                                    <NavLink to='/auditlog' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <BookOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Audit Log
                                        </h1>
                                    </NavLink>
                                    <NavLink to='/security' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                        <GppGoodOutlinedIcon />
                                        <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                            Security
                                        </h1>
                                    </NavLink>
                                </>
                            )}
                            {(userRole === 'developer' || userRole === 'admin') && (
                                <NavLink to='/apikeys' className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                                    <HttpOutlinedIcon />
                                    <h1 className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                                        API Keys
                                    </h1>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div onClick={handleLogout} className="w-full flex justify-start items-center gap-4 px-4 py-2 rounded-md scale-70 sm:scale-80 md:scale-90 lg:scale-100 cursor-pointer hover:bg-[#d4d4d4] duration-300 ease">
                        <ExitToAppOutlinedIcon />
                        <button className={`hidden lg:block text-[#3D4751] text-[0.7rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[0.9rem] ${isCollapsed ? 'hidden' : 'block'}`}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
