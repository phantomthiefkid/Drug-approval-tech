import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import '../../css/Profile.css'
import { viewProfile } from '../../redux/profile/ProfileSlice'

const ViewProfile = () => {
    const token = localStorage.getItem('token');
    const email = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
    const dispatch = useDispatch();
    const profileView = useSelector((state) => state.viewProfile.data);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])

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

    if (!profileView) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='bd mt-32 text-center font-semibold w-2/6'>
                <div className='bg-blue-900 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Hồ sơ</h2></div>
                <div>
                    <ul className='item-menu flex justify-center'>
                        <li>
                            <img className='logo mb-8 w-32 h-20 border' src='./langtu.jpg' alt='profile'></img>
                        </li>
                    </ul>
                    <ul className='w'>
                        <li className='form-item '><span>Role</span></li>
                        <li className="custom-input"><input type="text" name='roleName' value={profileView.roleName} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Họ và tên</span></li>
                        <li className="custom-input"><input type="text" name='fullname' value={profileView.fullname} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Email</span></li>
                        <li className="custom-input"><input type="email" name='email' value={profileView.email} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Ngày sinh</span></li>
                        <li className="custom-input"><input type="date" id='datepicker' name='dayOfBirth' value={profileView.dayOfBirth} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <ul className='flex justify-center mt-5 mb-7'>
                            <li><span className='mr-20'>Giới tính</span></li>
                            <li class="gender-radio">
                                <input type="radio" id="male" name="gender" disabled checked={profileView.gender === 1} className='drop-shadow-md mr-1 form-check-input custom-radio' />
                                <label for="male" className='mr-10'>Nam</label>

                                <input type="radio" id="female" name="gender" disabled checked={profileView.gender === 2} className='drop-shadow-md mr-1 form-check-input custom-radio' />
                                <label for="female">Nữ</label>
                            </li>
                        </ul>

                        <div className='flex justify-center gap-14 row mt-3 mb-5'>
                            <Link to={'/'}>
                                <button className="text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
                                    Thoát
                                </button>
                            </Link>
                            <Link to='/editprofile'>
                                <button className='text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center ml-auto'>
                                    Chỉnh sửa
                                </button>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ViewProfile