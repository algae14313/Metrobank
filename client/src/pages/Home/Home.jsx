import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import bannerImage from '../../assets/images/6.png'
import bannerImage2 from '../../assets/images/9.png'
import { io } from 'socket.io-client'
import Announcement from '@/components/Announcement'
import { useQuery } from '@tanstack/react-query'
import { fetchCredentials } from '@/api/Credentials'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Swiper styles inline
const swiperStyles = `
.swiper-pagination-bullet {
    background-color: #ffffff;
}
.swiper-button-next,
.swiper-button-prev {
    color: #ffffff;
}
`;

const { VITE_HOST } = import.meta.env
const socket = io(VITE_HOST, { transports: ['websocket'], debug: true });

export default function Home() {
const navigate = useNavigate()
const [announcement, setAnnouncement] = useState('')
const { data: credentials, isLoading: credentialsLoading } = useQuery({
    queryFn: () => fetchCredentials(),
    queryKey: ['homeCredentials']
})

useEffect(() => {
    if (credentials && !credentialsLoading) {
    navigate('/')
    }
    const onConnect = () => {
    console.log('Connected to server')
    }
    const onConnectError = (err) => {
    console.error('Connection error:', err)
    }
    const onMessage = (data) => {
    try {
        setAnnouncement(data)
    } catch (error) {
        console.error(error)
    } finally {
        setTimeout(() => {
        setAnnouncement('')
        }, 7000);
    }
    }
    socket.on('connect', onConnect)
    socket.on('connect_error', onConnectError)
    socket.on('message', onMessage)
    return () => {
    socket.off('connect', onConnect)
    socket.off('connect_error', onConnectError)
    socket.off('message', onMessage)
    }
}, [credentials, navigate])

const sendMessage = () => {
    socket.emit('message', 'Sound Check, sound check...')
}

return (
  <div className='w-full min-h-screen flex flex-col bg-[#121212]'>
    <Header__Home />
    <br />
    <br />
    <div className="w-full mt-8">
      <img 
        src={bannerImage}
        alt="Metrobank Banner" 
        className="w-full h-auto object-cover"
        style={{ maxHeight: '366px' }}
      />
    </div>

    <div className="w-full max-w-4xl mx-auto mt-16">
      <style>{swiperStyles}</style>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-blue-500 text-white p-8 text-center">
            <h2 className="text-2xl font-bold">Welcome to Metrobank</h2>
            <p>Discover amazing features and opportunities</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-500 text-white p-8 text-center">
            <h2 className="text-2xl font-bold">Special Offer</h2>
            <p>Get vouchers on our selected partners </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-purple-500 text-white p-8 text-center">
            <h2 className="text-2xl font-bold">New Features</h2>
            <p>Check out our latest updates and improvements</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    
    <div className="w-full max-w-4xl mx-auto mt-8 text-white text-center px-4">
      <h3 className="text-3xl font-bold mb-4">Welcome to Metrobank</h3>
      <p className="text-lg mb-4">
        Your trusted financial partner for over 50 years. At Metrobank, we're committed to helping you achieve your financial goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Personal Banking</h4>
          <p>Tailored solutions for your everyday financial needs.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Business Banking</h4>
          <p>Comprehensive services to help your business thrive.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2">Investment Services</h4>
          <p>Expert guidance to grow and protect your wealth.</p>
        </div>
      </div>
    </div>

    <div className="w-full mt-8 relative">
    <img 
      src={bannerImage2}
      alt="Metrobank Banner" 
      className="w-full h-auto object-cover"
      style={{ maxHeight: '366px' }}
    />
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
      <h2 className="text-4xl font-bold mb-4">Experience Banking Excellence</h2>
      <p className="text-xl max-w-2xl text-center">
        At Metrobank, we're committed to providing innovative financial solutions 
        tailored to your needs. Discover a world of possibilities with our comprehensive 
        range of services designed to help you achieve your financial goals.
      </p>
    </div>
  </div>

    {announcement && <Announcement message={announcement} />}
  </div>
)
}