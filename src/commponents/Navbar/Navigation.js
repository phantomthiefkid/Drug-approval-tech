import '../../css/Navbar.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Capsule } from 'react-bootstrap-icons';
const Navigation = () => {
    const [navbarBackground, setNavbarBackground] = useState('bg-indigo-950');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavbarBackground('bg-gray-500');
        } else {
            setNavbarBackground('bg-indigo-950');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <div className={`navbar ${navbarBackground} text-white h-32 p-4 fixed w-full top-0 transition-all ease-in-out duration-300 navigation`}>
                <div id='logo' className='pl-32'>

                    <ul className='item-menu flex items-center'>
                        <li>
                            <Link to={`/`}>
                                <img className='logo mb-3' src='./logo1.png' alt='Drug bank' />
                            </Link>
                        </li>
                        <li className='text-lg flex items-center'> {/* Thêm lớp items-center để căn chỉnh theo chiều ngang */}
                            <Link><Capsule size={20}></Capsule>
                                <span className='ml-2'>Thuốc  </span></Link>
                        </li>
                        <li></li>
                    </ul>


                </div>

                <div className="container w-full pl-36">
                    <form className='flex rounded-3xl overflow-hidden ring-indigo-500/50 ring-offset-[3px]'>
                        <button className='p-2 w-10 bg-indigo-500 hover:bg-indigo-500/80 transition-all cursor-pointer text-indigo-100'><Search></Search></button>
                        <input type="text" className='bg-indigo-100 !outline-none pl-3 py-2 rounded-r-3xl' /> {/* Thêm lớp rounded-xl ở đây */}
                    </form>
                </div>

                <div className="container pl-4">
                    <ul className='item-menu'>
                        <li className=' flex items-center'>
                            <li className='text-lg'>Đăng nhập</li>
                            <Link to={`/viewprofile`}>  <img className='logo' src='./nguyentan.png' alt='profile'></img></Link>
                        </li>
                        <li className='text-lg flex items-center'>
                            <span><button><i>Ngôn ngữ</i></button></span>
                            <img className='logo' src='./vietnam.png' alt='Drug bank' />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};


export default Navigation