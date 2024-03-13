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
      <div className='mt-28 mb-10 bg-slate-50 w-1/3 mx-auto shadow-2xl border-separate rounded-b-3xl'>
        <div className='bg-blue-900 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Hồ sơ</h2></div>
        <div className='w-3/4 mx-auto mt-6'>
          <div className='text-center'>
            <div className='mb-5 mt-3 ml-14'>
              <img
                src={profileView.avatar}
                alt='Avatar Preview'
                className='logo object-cover rounded-full h-40 w-40'
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Role:</label>
            <input type="text" name='roleName' disabled value={profileView.roleName} class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Họ và tên:</label>
            <input type="text" disabled name='fullname' value={profileView.fullname} class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Email:</label>
            <input type="email" name='email' value={profileView.email} disabled class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Ngày sinh:</label>
            <input type="date" id='datepicker' name='dayOfBirth' value={profileView.dayOfBirth} disabled class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <ul className='flex justify-center mt-5 mb-7'>
            <li><span className='mr-20'>Giới tính</span></li>
            <li class="gender-radio">
              <input type="radio" id="male" name="gender" disabled checked={profileView.gender === 1} className='drop-shadow-md mr-1 form-check-input custom-radio' />
              <label for="male" className='mr-10'>Nam</label>

              <input type="radio" id="female" name="gender" disabled checked={profileView.gender === 2} className='drop-shadow-md mr-1 form-check-input custom-radio' />
              <label for="female">Nữ</label>
            </li>
          </ul>

          <div className='flex justify-center gap-10 row mt-3 mb-5'>
            <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
              <button className="text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
                Thoát
              </button>
            </Link>
            <Link to='/editprofile' onClick={() => window.scrollTo(0, 0)}>
              <button className='text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center ml-auto'>
                Chỉnh sửa
              </button>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default ViewProfile