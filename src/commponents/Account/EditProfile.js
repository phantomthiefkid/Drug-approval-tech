import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import '../../css/Profile.css'

import { viewProfile, updateProfile } from '../../redux/profile/ProfileSlice';

const EditProfile = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const email = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
    const profileView = useSelector((state) => state.viewProfile.data)

    const [profileUpdate, setProfileUpdate] = useState({
        fullname: '',
        dayOfBirth: '',
        gender: 0,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (email) {
                    await dispatch(viewProfile(email));
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchData();
    }, [dispatch, email]);

    useEffect(() => {
        setProfileUpdate(profileView);
    }, [profileView])

    console.log(profileUpdate);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue;

        if (type === "radio" && name === "gender") {
            newValue = parseInt(value, 10);
        }
        if (name === 'fullname' || name === 'dayOfBirth') {
            newValue = value
        }
        setProfileUpdate((prevUser) => ({
            ...prevUser,
            [name]: newValue,
        }));
    };

    function handleClick() {
        Swal.fire({
            title: "Your information will not be saved?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            showClass: {
                popup: 'animate__animated animate__fadeIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            },
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.scrollTo(0, 0);
                Navigate(`/viewprofile`);
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(updateProfile(profileUpdate));
            if (updateProfile.fulfilled.match(result)) {
                await dispatch(viewProfile(email));
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Profile Successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                }).then(() => {
                    Navigate('/viewprofile');
                });
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Failed to update profile: ${error.message || 'Unknown error'}`,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        }
    };

    if (profileView && profileView.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='bd mt-32 text-center font-semibold w-2/6'>
                <div className='bg-blue-900 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Hồ sơ</h2></div>
                <div>
                    <ul className='item-menu flex justify-center'>
                        <li>
                            <img className='logo mb-8 w-32 h-20 border' src='./langtu.jpg' alt='profile'></img>
                        </li>
                    </ul>
                    <ul>
                        <li className='form-item '><span>Role</span></li>
                        <li className="custom-input"><input type="text" name='roleName' disabled value={profileUpdate.roleName} className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Họ và tên</span></li>
                        <li className="custom-input"><input type="text" name='fullname' value={profileUpdate.fullname} onChange={handleChange} minLength='1' className='drop-shadow-md w-96 h-8 mt-3 mb-3' required title='FullName is required'></input></li>

                        <li className='form-item '><span>Email</span></li>
                        <li className="custom-input"><input type="email" name='email' disabled value={profileUpdate.email} className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Ngày sinh</span></li>
                        <li className="custom-input"><input type="date" id='datepicker' name='dayOfBirth' value={profileUpdate.dayOfBirth} onChange={handleChange} className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <ul className='flex justify-center mt-5 mb-7'>
                            <li><span className='mr-20'>Giới tính</span></li>
                            <li class="gender-radio">
                                <input type="radio" id="male" name="gender" value="1" onChange={handleChange} checked={profileUpdate.gender === 1} className='drop-shadow-md mr-1 form-check-input custom-radio' />
                                <label for="nam" className='mr-10'>Nam</label>

                                <input type="radio" id="female" name="gender" value="2" onChange={handleChange} checked={profileUpdate.gender === 2} className='drop-shadow-md mr-1 form-check-input custom-radio' />
                                <label for="nu">Nữ</label>
                            </li>
                        </ul>

                        <div className='flex justify-center gap-14 row mt-3 mb-3'>
                            <Link to={'/viewprofile'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick();
                                }}>
                                <button className="text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
                                    Trở về
                                </button>
                            </Link>
                            <Link to=''>
                                <button className='text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center ml-auto' type='submit' onClick={handleSubmit}>
                                    Lưu
                                </button>
                            </Link>
                        </div>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default EditProfile