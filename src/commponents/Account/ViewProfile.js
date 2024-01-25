import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import '../../css/Profile.css'
import Navigation from '../Navbar/Navigation';
import Footer from '../Footer/Footer'
import { viewProfile } from '../../redux/profile/ProfileSlice'

const ViewProfile = () => {
    const token = localStorage.getItem('token');
    const email = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
    console.log(email)
    const dispatch = useDispatch();
    const profileView = useSelector((state) => state.viewProfile);

    console.log(profileView)

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

    // if (profileView.isError || !profileView.data) {
    //     return <div>Error loading profile.</div>;
    // }

    return (
        <>
            <Navigation />
            <div className='bd mt-32 text-center font-semibold w-2/6'>
                <h2 className='bg text-center text-white text-xl'>Hồ sơ</h2>
                <div>
                    <ul className='item-menu flex justify-center'>
                        <li>
                            <img className='logo mb-8 w-20 h-20 border' src='./langtu.jpg' alt='profile'></img>
                        </li>
                    </ul>
                    <ul>
                        <li className='form-item '><span>Họ và tên</span></li>
                        <li className="custom-input"><input type="text" name='fullname' value={profileView.fullname} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Email</span></li>
                        <li className="custom-input"><input type="email" name='email' value={profileView.email} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Số điện thoại</span></li>
                        <li className="custom-input"><input type="text" placeholder='0987391600' disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Ngày sinh</span></li>
                        <li className="custom-input"><input type="data" id='datepicker' name='dayOfBirth' value={profileView.dayOfBirth} disabled className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <ul className='flex justify-center mt-5 mb-7'>
                            <li><span className='mr-20'>Giới tính</span></li>
                            <li class="gender-radio">
                                <input type="radio" id="male" name="gender" disabled checked={profileView.gender === 'male' || profileView.gender === 'Male'} className='drop-shadow-md mr-1' />
                                <label for="male" className='mr-10'>Nam</label>

                                <input type="radio" id="female" name="gender" disabled checked={profileView.gender === 'female' || profileView.gender === 'Female'} className='drop-shadow-md mr-1' />
                                <label for="female">Nữ</label>
                            </li>
                        </ul>

                        <div className='flex justify-center row mt-3 mb-5'>
                            <Link to={'/'}>
                                <button className='btnCancel mr-10'>
                                    Thoát
                                </button>
                            </Link>
                            <Link to='/editprofile'>
                                <button className='btnSave' type='submit'>
                                    Chỉnh sửa
                                </button>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewProfile