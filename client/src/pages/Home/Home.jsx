import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header__Home from '../../components/Header__Home';
import { io } from 'socket.io-client';
import Announcement from '@/components/Announcement';
import { useQuery } from '@tanstack/react-query';
import { fetchCredentials } from '@/api/Credentials';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'; // Import necessary modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images
import Image1 from '../../assets/images/0.png';
import Image2 from '../../assets/images/1.png';
import Image3 from '../../assets/images/2.png';
import Image4 from '../../assets/images/3.png';
import Image5 from '../../assets/images/4.png';

// Environment variable
const { VITE_HOST } = import.meta.env;

// Initialize socket connection
const socket = io(VITE_HOST, {
    transports: ['websocket'],
    debug: true,
});

export default function Home() {
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState('');

    // Fetch credentials using react-query
    const { data: credentials, isLoading: credentialsLoading } = useQuery({
        queryFn: () => fetchCredentials(),
        queryKey: ['homeCredentials'],
    });

    // Socket connection and message handling
    useEffect(() => {
        if (credentials && !credentialsLoading) {
            navigate('/');
        }

        const onConnect = () => {
            console.log('Connected to server');
        };

        const onConnectError = (err) => {
            console.error('Connection error:', err);
        };

        const onMessage = (data) => {
            try {
                setAnnouncement(data);
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setAnnouncement('');
                }, 7000);
            }
        };

        socket.on('connect', onConnect);
        socket.on('connect_error', onConnectError);
        socket.on('message', onMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('connect_error', onConnectError);
            socket.off('message', onMessage);
        };
    }, [credentials, navigate]);

    // Function to send message via socket
    const sendMessage = () => {
        socket.emit('message', 'Sound Check, sound check...');
    };

    return (
        <div className='w-full h-screen flex flex-col justify-start items-center bg-[#121212]'>
            <Header__Home />
            <br />
            <br />
            <br />
            <RotatingBanner />
        </div>
    );
}


const RotatingBanner = () => {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]} 
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            navigation={true}
            className='w-full h-64'
        >
            <SwiperSlide>
                <img
                    src={Image1}
                    alt='Slide 1'
                    className='w-full h-64 object-cover'
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={Image2}
                    alt='Slide 2'
                    className='w-full h-64 object-cover'
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={Image3}
                    alt='Slide 3'
                    className='w-full h-64 object-cover'
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={Image4}
                    alt='Slide 4'
                    className='w-full h-64 object-cover'
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={Image5}
                    alt='Slide 5'
                    className='w-full h-64 object-cover'
                />
            </SwiperSlide>
        </Swiper>
    );
};
