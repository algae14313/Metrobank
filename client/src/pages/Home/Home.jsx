import React from 'react'
import { Link } from 'react-router-dom'
import Header__Home from '../../components/Header__Home'
import test from '../../assets/test.jpg'

export default function Home() {
    return (
        <div className='w-full h-screen flex justify-start items-center flex-col'>
            <Header__Home />
            <div className="w-full h-full p-[5rem] flex justify-center items-center">
                <img src={test} alt="asd" className='w-200 h-200 object-cover' />
                
            </div>
            UNDER CONSTRUCTION
        </div>
    )
}
