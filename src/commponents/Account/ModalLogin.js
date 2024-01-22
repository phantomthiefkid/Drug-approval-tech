import React, { useEffect, useState } from 'react'
import { XCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux'
import { loginAccount } from '../../redux/auth/loginSlice';

export default function ModalLogin({ visible, onClose }) {
  const [login, setLogin] = useState({ email: '', password: '' })
  const dispatch = useDispatch();
  const token = useSelector((token) => token.login.data)
  if (!visible) {
    return null;
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({ ...prevLogin, [name]: value }));
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (login) {
      await dispatch(loginAccount({email: login.email, password: login.password})).then(() => {console.log(token)})
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-96 " style={{ padding: '25px' }}>
        <div className='flex justify-end'>
          <button onClick={onClose} className='p-0'>
            <XCircle className='text-gray-500' size={20} />
          </button>
        </div>


        <h1 className="font-semibold text-center text-2xl text-gray-700 mb-5">
          Đăng nhập
        </h1>
        <div className="flex flex-col">
          <span className='mb-2'>Tên tài khoản</span>
          <input
            type="text"
            className="border p-2 rounded mb-5 drop-shadow-md"
            placeholder="Nhập tên tài khoản"
            name='email'
            value={login.email}
            onChange={handleOnChange}
          />
          <span className='mb-2'>Mật khẩu</span>
          <input
            type="text"
            className="border p-2 rounded mb-5 drop-shadow-md"
            placeholder="Nhập mật khẩu"
            name='password'
            value={login.password}
            onChange={handleOnChange}
          />
          <div className="flex mb-5">

            <input type="checkbox" className="mr-2" />

            <div className="">
              <span className="mb-5 mr-32">Nhớ tài khoản</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button onClick={handleLogin} className="px-2 py-2 bg-gray-700 text-white rounded">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  )
}
