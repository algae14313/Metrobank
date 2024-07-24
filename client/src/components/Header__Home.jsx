import Logo from '../assets/mbLogo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
const { VITE_HOST, VITE_ADMIN_TOKEN } = import.meta.env

export default function Header__Home() {

    const handleClick = async () => {
        try {
            const sampleAccountNo = '000000005'
            const res = await axios.get(`${VITE_HOST}/api/metrobank/myaccount/auth/${sampleAccountNo}`, {
                headers: {
                    Authorization: `Bearer ${VITE_ADMIN_TOKEN}`
                }
            })
            const url = res?.data?.url
            window.open(url, '_blank', 'width=1080,height=600')
        } catch (error) {
            console.error()
        }
    }

    return (
        <>
            <div className="fixed w-full h-[8%] flex justify-between items-center px-[7rem] sm:px-[10rem] md:px-[15rem] lg:px-[10rem] xl:px-[15rem] z-[1] bg-black"> {/* Added bg-black here */}
                <div className="h-full flex justify-start items-center gap-[1rem]">
                    <Link to={`/`} className="w-[12rem] h-full">
                        <img src={Logo} alt="Logo" className='w-full h-full object-contain' />
                    </Link>
                    {/* Commented links remain the same */}
                </div>

                <div className=" h-full flex justify-end items-center gap-[.7rem] sm:gap-[1rem] md:gap-[1.5rem] lg:gap-[.8rem]">
                    <Link to={`/signup`} className='text-black px-[1rem] py-[.6rem] bg-[#CBC300] rounded-xl font-[600] text-[.8rem] hover:bg-[#b00b69] hover:text-white transition duration-300'> {/* Added hover:text-white and transition */}
                        Sign Up
                    </Link>
                    <Link to={`/login`} className='text-white px-[1rem] py-[.6rem] border-[1px] border-[#CBC300] rounded-xl font-[500] text-[.8rem] hover:bg-[#CBC300] hover:text-black transition duration-300'> {/* Added transition */}
                        Login
                    </Link>
                </div>
            </div>
        </>
    )
}