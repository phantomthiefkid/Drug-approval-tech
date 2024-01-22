import '../../css/Navbar.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Capsule } from 'react-bootstrap-icons';
import ModalLogin from '../Account/ModalLogin';
const Navigation = () => {
    const [navbarBackground, setNavbarBackground] = useState('bg-blue-950');
    const [showModalLogin, setShowModalLogin] = useState(false);
    const handleOnClose = () => setShowModalLogin(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavbarBackground('bg-blue-950');
        } else {
            setNavbarBackground('bg-blue-950');
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
            <ModalLogin onClose={handleOnClose} visible={showModalLogin} />
            <div className={`navbar ${navbarBackground} text-white h-24 fixed z-50 w-full top-0 transition-all ease-in-out duration-300 navigation`}>
                <div id='logo' className='pl-24'>
                    <ul className='item-menu flex items-center'>
                        <li> <Link to={`/`}><div>
                            <div className='flex justify-center items-center'>
                                <img className=' mt-4' src='./logo.png' /><span className='text-gray-300 w-full text-sm font-medium'>DRUG APPROVAL</span></div>

                        </div></Link>
                        </li>
                        <li className='text-lg flex items-center'>
                            <Link><Capsule size={20}></Capsule>
                                <span className='ml-2 hover:text-yellow-300'>Thuốc  </span></Link>
                        </li>
                    </ul>
                </div>
                <div className="container w-2/3 pl-22 ml-10">
                    <form className='flex rounded-lg overflow-hidden ring-indigo-500/50 ring-offset-[3px]'>
                        <button className='p-2 w-12 bg-indigo-500 hover:bg-indigo-500/80 transition-all cursor-pointer text-indigo-100'><Search></Search></button>
                        <input type="text" className='bg-indigo-100 text-black dark:placeholder-gray-400 !outline-none pl-3 py-2 rounded-r-lg w-96' /> {/* Thêm lớp rounded-xl ở đây */}
                    </form>
                </div>
                <div className="container pl-2">
                    <ul className='item-menu flex'>
                        <li className='items-center text-lg w-36 hover:text-yellow-300'><button onClick={() => setShowModalLogin(true)}>Đăng nhập</button></li>


                        <li><Link to={`/viewprofile`}>  <img className='logo rounded-full' src='./langtu.jpg' alt='profile'></img></Link></li>
                        <li className='text-lg flex items-center justify-end hover:text-yellow-300'>
                            <div className='w-32'>
                                <span><button><i> Ngôn ngữ </i></button></span>
                            </div>
                            <li><img className='logo' src='./vietnam.png' alt='Drug bank' /></li>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
};


export default Navigation