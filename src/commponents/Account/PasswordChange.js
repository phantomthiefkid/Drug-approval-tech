import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { passwordChange } from '../../redux/auth/loginSlice'
import { viewProfile } from '../../redux/profile/ProfileSlice'



const PasswordChange = () => {
  const profileView = useSelector((state) => state.viewProfile.data);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [changePass, setChangePass] = useState({
    currentPassword: '',
    newPassword: '',
    email: profileView.email || ''
  });

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      Navigate('/')
    }
  }, [token])

  // const getPass = (e) => {
  //   setChangePass({ ...changePass, [e.target.name]: e.target.value })
  // }

  const handleChange = e => {
    const { name, value } = e.target;
    setChangePass(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Vui lòng điền đầy đủ thông tin!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Mật khẩu không khớp!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      if (passwordChange.fulfilled)
        await dispatch(passwordChange(changePass));
      Swal.fire({
        title: 'Success!',
        text: 'Mật khẩu đã được thay đổi thành công!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then(() => {
        localStorage.removeItem("token");
        Navigate('/');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Failed to change password: ${error.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  };



  console.log('Password', changePass)

  return (
    <main id="content" role="main" class="w-full  max-w-md mx-auto p-6 mt-28">
      <div class="mt-7 bg-white  rounded-xl shadow-2xl border-10 border-indigo-500">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-500">Thay đổi mật khẩu</h1>
          </div>

          <div class="mt-5">
            <form>
              <div class="grid gap-y-4">
                <div>
                  <label for="email" class="block text-sm font-bold ml-1 mb-2">Mật khẩu cũ:</label>
                  <div class="relative">
                    <input type="password" id="currentPassword" name="currentPassword" onChange={handleChange} class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required placeholder='Nhập mật khẩu cũ' />
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-bold ml-1 mb-2">Mật khẩu mới</label>
                  <div class="relative">
                    <input type="password" id="newPassword" name="newPassword" onChange={handleChange} class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required placeholder='Nhập mật khẩu mới' />
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-bold ml-1 mb-2">Xác nhận mật khẩu</label>
                  <div class="relative">
                    <input type="password" id="confirmPassword" name="confirmPassword" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required placeholder='Nhập lại mật khẩu mới' />
                  </div>
                </div>
                <button type="submit" onClick={handleSubmit} class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </main>
  )
}

export default PasswordChange