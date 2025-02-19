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
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials';
import { fetchAccount } from '@/api/Accounts';

export default function Sidebar() {
    const navigate = useNavigate()

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
        refetchInterval: 5000
    });

    const maskAccountNumber = (accountNumber) => {
        if (accountNumber?.length !== 9) return accountNumber;
        return '******' + accountNumber.slice(-3);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/metrobank')
    };

    return (
        <>
            <div className="sm:w-[none] md:w-[none] lg:w-[20%] h-screen px-[.1rem] sm:px-[.3rem] md:px-[.5rem] lg:px-[1rem] py-[1rem] bg-[#ffffff] dark:bg-[#171717] border-r border-gray-900/10 overflow-auto flex flex-col justify-between">
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

                <div className="w-full flex flex-col justify-between items-start flex-grow">
                    <div className="w-full flex flex-col flex-grow">
                        <br />
                        <br />
                        <div className="hnavs w-full py-[1rem] flex flex-col gap-[.2rem] justify-start items-start">
                            <NavLink to={`/`} className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                {/* <GridViewIcon /> */}
                                Dashboard
                            </NavLink>
                            {
                                (role === 'user' || role === 'developer') && (
                                    <>
                                        <NavLink to='/statement' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            {/* <ReceiptLongOutlinedIcon /> */}
                                            View Statement
                                        </NavLink>
                                        <NavLink to='/transfer' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            {/* <MoveDownOutlinedIcon /> */}
                                            Make a transfer
                                        </NavLink>
                                    </>
                                )
                            }

                            {
                                (role === 'it' || role === 'admin') && (
                                    <NavLink to='/developers' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        {/* <CodeOutlinedIcon /> */}
                                        Developers
                                    </NavLink>
                                )
                            }
                            {
                                (role === 'hr' || role === 'admin') && (
                                    <NavLink to='/employees' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        {/* <SupervisorAccountOutlinedIcon /> */}
                                        Employees
                                    </NavLink>
                                )
                            }
                            {
                                (role === 'rb' || role === 'admin') && (
                                    <>
                                        <NavLink to='/ledger' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            {/* <SyncAltOutlinedIcon /> */}
                                            Ledger
                                        </NavLink>
                                        <NavLink to='/customers' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            {/* <AccessibilityOutlinedIcon /> */}
                                            Manage Customers
                                        </NavLink>
                                    </>
                                )
                            }
                        </div>
                        <br />
                        <br />
                        <h1 className='hidden sm:hidden md:hidden lg:block text-[#9CA3AF] text-[.3rem] sm:text-[.5rem] md:text-[.7rem] lg:text-[.9rem]'>Settings</h1>
                        <div className="hnavs w-full py-[1rem] flex flex-col justify-start items-start gap-[.2rem] flex-grow">
                            <NavLink to='/profile' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                {/* <Person2OutlinedIcon /> */}
                                Profile
                            </NavLink>
                            {
                                (role === 'it' || role === 'admin') && (
                                    <>
                                        <NavLink to='/auditlog' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            {/* <BookOutlinedIcon /> */}
                                            Audit Log
                                        </NavLink>
                                        <NavLink to='/security' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                            {/* <GppGoodOutlinedIcon /> */}
                                            Security
                                        </NavLink>
                                    </>
                                )
                            }
                            {
                                (role === 'developer' || role === 'admin') && (
                                    <NavLink to='/apikeys' className="w-full transition-colors duration-300 ${isActive ? 'bg-[#CBC300] text-white' : 'hover:bg-[#CBC300] hover:text-white' text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1]">
                                        {/* <HttpOutlinedIcon /> */}
                                        API Keys
                                    </NavLink>
                                )
                            }
                        </div>
                    </div>
                    {/* Moved Logout Button to a Separate Div */}
                    <div className="w-full flex justify-center items-center mt-auto">
                        <div onClick={handleLogout} className="w-full flex justify-start items-center gap-[1rem] px-[1rem] py-[.7rem] rounded-md scale-[.7] sm:scale-[.8] md:scale-[.9] lg:scale-[1] cursor-pointer hover:bg-[#FFFFFF] duration-300 ease">
                            <ExitToAppOutlinedIcon style={{color: '#CBC300'}} className="transition-colors duration-300 group-hover:text-white"/>
                            <button className='hidden sm:hidden md:hidden lg:block text-[#CBC300] text-[.7rem] sm:text-[.8rem] md:text-[.7rem] lg:text-[.9rem] transition-colors duration-300 hover:text-white group'>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
