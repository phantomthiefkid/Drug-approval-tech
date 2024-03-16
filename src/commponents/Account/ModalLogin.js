import React, { useState } from 'react';
import { XCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginApi } from '../../redux/auth/loginSlice';

export default function ModalLogin({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!handleValidationEmail()) {
        return;
      }
      if (!password) {
        toast.error('The password is required');
        return;
      }
      const response = await loginApi(email, password);
      const token = response.data;
      localStorage.setItem('token', JSON.stringify(token));

      localStorage.setItem('token', token.accessToken);
      const storedToken = localStorage.getItem('token');
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Đăng nhập thất bại', error);
      setLoginError('Login Failed: Your email or password is incorrect');
      toast.error('Login Failed: Your email or password is incorrect');
    }
  };


  const handleValidationEmail = () => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@(gmail\.com)$/;

    if (!email) {
      toast.error('An email is required!');
      return false;
    } else if (!emailPattern.test(email)) {
      toast.error('An invalid email format! (must be @gmail.com)');
      return false;
    }
    return true;
  };

  if (!visible) return null;
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="fixed inset-0 bg-black z-10 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-2 rounded w-96 " style={{ padding: '25px' }}>
          <div className='flex justify-end'>
            <button onClick={onClose} className='p-0'>
              <XCircle className='text-gray-500' size={20} />
            </button>
          </div>

          <h1 className="font-semibold text-center text-2xl text-gray-700 mb-5">
            Đăng nhập
          </h1>
          {/* {loginError && <div className="text-red-500 text-sm mb-3">{loginError}</div>} */}
          <div className="flex flex-col">
            <span className='mb-2'>Email</span>
            <input
              type="email"
              className="border p-2 rounded mb-5 drop-shadow-md"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className='mb-2'>Mật khẩu</span>
            <input
              type="password"
              className="border p-2 rounded mb-5 drop-shadow-md"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex mb-5">
              <input type="checkbox" className="mr-2" />
              <div className="">
                <span className="mb-5 mr-32">Nhớ tài khoản</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="px-5 py-2 bg-gray-700 text-white rounded" onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
