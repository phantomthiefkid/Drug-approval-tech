import '../../css/Navbar.css'
import React, { useState, useEffect } from 'react';
import { Search, Capsule } from 'react-bootstrap-icons';
import { useDispatch} from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ModalLogin from '../Account/ModalLogin';

import { getUserDataFromToken } from '../../redux/auth/loginSlice';

const Navigation = () => {
    const [navbarBackground, setNavbarBackground] = useState('bg-blue-950');
    const [showModalLogin, setShowModalLogin] = useState(false);
    const handleOnClose = () => setShowModalLogin(false);

    const data = getUserDataFromToken();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const roleName = getUserDataFromToken();
    const dispatch = useDispatch();

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavbarBackground('bg-blue-950');
        } else {
            setNavbarBackground('bg-blue-950');
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCloseDropdown = () => {
        setIsOpen(false)
    }

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
                <div id='logo' className='pl-28'>
                    <ul className='item-menu flex items-center'>
                        <li> <Link to={`/`}><div>
                            <div className='flex justify-center items-center'>
                                <img className=' mt-4' src='./logo.png' /><span className='text-gray-300 w-full text-sm font-medium'>DRUG APPROVAL</span></div>

                        </div></Link>
                        </li>
                        <li className='text-lg flex items-center'>
                            <Link to={'/'}><Capsule size={20}></Capsule>
                                <span className='ml-2 hover:text-yellow-300'>Thuốc  </span></Link>
                        </li>
                        {roleName && roleName === 'SUPERADMIN' && (
                            <li onClick={toggleDropdown} className='text-lg w-full flex items-center hover:text-yellow-300'><button>Quản lí</button>
                                {isOpen && (
                                    <div className="absolute w-44 top-20 left-100 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-2 w-full">
                                            <Link to={`/userlist`}><button className='block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Quản lí người dùng</button></Link>
                                            <button className='block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Quản lí đơn hàng</button>
                                        </div>
                                    </div>
                                )}
                            </li>

                        )}

                    </ul>
                </div>
                <div className="container w-64 pl-22">
                    <form className='flex rounded-lg w-full overflow-hidden ring-indigo-500/50 ring-offset-[3px]'>
                        <button className='p-2 w-12 bg-indigo-500 hover:bg-indigo-500/80 transition-all cursor-pointer text-indigo-100'><Search></Search></button>
                        <input type="text" className='bg-indigo-100 text-black dark:placeholder-gray-400 !outline-none pl-3 py-2 rounded-r-lg w-96' /> {/* Thêm lớp rounded-xl ở đây */}
                    </form>
                </div>
                <div className="container pl-2">
                    <ul className='item-menu flex'>
                        {token ? (<li className='items-center text-lg w-36 hover:text-yellow-300'><button onClick={() => setShowModalLogin(true)}>{roleName}</button></li>) : (<li className='items-center text-lg w-36 hover:text-yellow-300'><button onClick={() => setShowModalLogin(true)}>Đăng nhập</button></li>)}


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