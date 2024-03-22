import React, { useState, useEffect } from 'react';
import { Search, Capsule, Sliders, Boxes, BoxArrowRight } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import '../../css/Navbar.css'
import ModalLogin from '../Account/ModalLogin';
import { getUserDataFromToken, getUserNameFromToken } from '../../redux/auth/loginSlice';
import { viewProfile } from '../../redux/profile/ProfileSlice'

const Navigation = () => {
  const [navbarBackground, setNavbarBackground] = useState('bg-blue-900 h-18');
  const [searchForm, setSearchForm] = useState('')
  const [image, setImage] = useState('')
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleOnClose = () => setShowModalLogin(false);
  const data = getUserNameFromToken();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const roleName = getUserDataFromToken()
  const email = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
  const profileView = useSelector((state) => state.viewProfile.data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          await dispatch(viewProfile(email));
        }
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    }
    fetchData();
  }, [dispatch, email]);
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBackground('bg-indigo-500 bg-opacity-50 h-16');
      setSearchForm('mb-1')
      setImage('mb-1')
    } else {
      setNavbarBackground('bg-blue-900 h-18');
      setSearchForm('')
      setImage('')
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownProfile = () => {
    setIsOpenProfile(!isOpenProfile)
  }

  const toggleCloseDropdown = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate('/');
    }
  }

  return (
    <>
      <ModalLogin onClose={handleOnClose} visible={showModalLogin} />
      <div className={`navbar ${navbarBackground} text-white fixed z-50 w-full top-0 transition-all ease-in-out duration-300 navigation`}>
        <div id='logo' className='pl-28'>
          <div className='item-menu flex gap-12 items-center'>
            <div> <Link to={`/`}><div>
              <div className='flex justify-center items-center'>
                <img className=' mt-2' src='https://s3.ap-northeast-1.amazonaws.com/nguyentan/1711041066763-Remove-bg.ai_1711041054996.png' /><span className='text-gray-300 w-full text-sm font-medium'>DRUG APPROVAL</span></div>

            </div></Link>
            </div>
            <div className='text-lg flex items-center'>
              {roleName === 'ADMIN' || roleName === 'SECRETARY' ? <Link to={'/organization'}><Capsule size={20}></Capsule>
                <p className='ml-2 hover:text-yellow-300'>Thuốc</p></Link> : <Link to={'/organizationGuest'}><Capsule size={20}></Capsule>
                <p className='ml-2 hover:text-yellow-300'>Thuốc</p></Link>}
            </div>
            {(roleName === 'ADMIN' || roleName === 'SECRETARY') && (
              <div className='text-lg flex items-center'>
                <Link to={'/druglist'}>
                  <Boxes className='mr-2' size={30}></Boxes>
                  <p className='w-20 hover:text-yellow-300'>Hoạt chất</p>
                </Link>
              </div>
            )}
            {(roleName === 'SECRETARY' || roleName === 'ADMIN') && (
              <div onClick={toggleDropdown} className='text-lg w-full flex items-center hover:text-yellow-300'><Sliders className='mr-2' size={20} /><button><p className='w-20'>Quản lí</p></button>
                {isOpen && (
                  <div className="absolute w-44 top-14 left-100 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 w-full">
                      {roleName && roleName === 'ADMIN' && (
                        <Link to={`/userlist`}><button className='block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Quản lí người dùng</button></Link>
                      )}
                      <Link to={`profilelist`}><button className='block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Quản lí hồ sơ thuốc</button></Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="container w-64 mr-10">
          <form className={`flex rounded-lg w-full ${searchForm} overflow-hidden ring-indigo-500/50 ring-offset-[3px]`}>
            <button className='p-2 w-12 bg-indigo-500 hover:bg-indigo-500/80 transition-all cursor-pointer text-indigo-100'><Search></Search></button>
            <input type="text" className='bg-indigo-100 text-black dark:placeholder-gray-400 !outline-none pl-3 py-2 rounded-r-lg w-96' />
          </form>
        </div>
        <div className="container pl-2">
          <div className='item-menu flex gap-6'>
            <div className='text-lg flex items-center justify-center hover:text-yellow-300'>
              <div className=''>
                <span><button><i> Ngôn ngữ </i></button></span>
              </div>
              <div><img className={`logo ${image}`} src='https://s3.ap-northeast-1.amazonaws.com/nguyentan/1711041313754-Remove-bg.ai_1711041268395.png' alt='Drug bank' /></div>
            </div>
            {token ? (
              <div className='flex items-center'>
                <div className='items-center text-wrap hover:text-yellow-300'>
                  {profileView?.fullname}
                </div>
                <div>
                  <div onClick={toggleDropdownProfile} className='relative'>
                    <img className='rounded-full h-14 ml-2' src={profileView?.avatar || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere.png'} alt={profileView?.fullname} />
                    {isOpenProfile && (
                      <div className="absolute w-32 top-14 left-100 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-2 w-full">
                          <Link to={`/passwordchange/${email}`}><button className='block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' onClick={() => window.scrollTo(0, 0)}>Đổi mật khẩu</button></Link>
                          <Link to={`/viewprofile`}><button className='block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' onClick={() => window.scrollTo(0, 0)}>Hồ sơ</button></Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='cursor-pointer hover:text-blue-500'><BoxArrowRight size={25} onClick={handleLogout}></BoxArrowRight></div>
              </div>
            ) : (
              <div className='items-center text-lg w-36 hover:text-yellow-300'>
                <button onClick={() => setShowModalLogin(true)}>Đăng nhập</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation