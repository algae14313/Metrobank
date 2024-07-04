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

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDeveloper, setIsDeveloper] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get('/api/user/current', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    setIsDeveloper(response.data.user.isdeveloper);
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
                        <NavLink to='/transactions' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                            <ReceiptLongOutlinedIcon />
                            <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Transactions</h1>
                        </NavLink>
                        <NavLink to='/transfer' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                            <MoveDownOutlinedIcon />
                            <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Make a Transfer</h1>
                        </NavLink>
                        {!isDeveloper && (
                            <>
                                <NavLink to='/employees' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <SupervisorAccountOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Employees</h1>
                                </NavLink>
                                <NavLink to='/customers' className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md text-white hover:bg-[#152466]">
                                    <AccessibilityOutlinedIcon />
                                    <h1 className={`${isCollapsed ? 'hidden' : 'block'}`}>Customers</h1>
                                </NavLink>
                            </>
                        )}
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
