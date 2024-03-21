import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findUserByEmail, updateUsers } from '../../../redux/userlistManagement/userSlice'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialUser = {
  gender: -1,
  fullname: '',
  dayOfBirth: ''
}

const EditUser = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const user = useSelector((user) => user.userlist.user)
  const [inforUser, setInforUser] = useState(initialUser);
  const [errorUser, setErrorUser] = useState(initialUser)
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(findUserByEmail(email));
      if (response.payload) {
        setInforUser(response.payload);
      } else {
        // Xử lý trường hợp không có dữ liệu
        console.error('Không thể tìm thấy dữ liệu người dùng.');
      }
    };

    fetchData();
  }, [email, dispatch]);

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])


  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue;

    if (type === 'radio' && name === 'gender') {
      // Nếu là radio button và có name là 'gender'
      newValue = parseInt(value, 10); // Chuyển đổi giá trị thành số nguyên
    }
    if (name === 'fullname' || name === 'dayOfBirth') {
      newValue = value
    }
    setInforUser((prevInfo) => ({
      ...prevInfo,
      [name]: newValue,
    }));

  };

  const validationUserUpdate = (user) => {
    const error = { ...initialUser }
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isValid = false;

    if (!user) {
      isValid = true
      return isValid;
    }
    if (user?.fullname.trim() === '') {
      error.fullname = 'Họ và tên không được để trống!!!';
      isValid = true;
    } else if (specialCharacters.test(user.fullname)) {
      error.fullname = 'Họ và tên không được có ký tự đặc biệt'
      isValid = true;
    }
    setErrorUser(error);
    return isValid
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!validationUserUpdate(inforUser)) {
        await dispatch(updateUsers(inforUser));
        toast.success('Cập nhật thành công', { autoClose: 200 });
      }
    } catch (error) {

      console.error('Error updating user:', error);
      toast.error('Cập nhật thất bại', { autoClose: 200 });
    }
  };

  return (
    <>
      <div className='mt-32 bg-slate-50 w-1/3 mx-auto shadow-2xl border-separate'>
        <ToastContainer />
        <div className='mb-8 mt-12'>
          <div className='bg-blue-900 mt-11 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Hồ sơ</h2></div>
          <form className='w-2/3 mx-auto mt-6'>
            <div className='flex justify-center'>
              <img
                src={inforUser?.avatar}
                alt='Avatar Preview'
                className='logo object-cover rounded-full h-40 w-40'
              />
            </div>
            <div className='flex mb-3 gap-6 mt-4'>
              <div class=" w-1/2">
                <label for="base-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Họ và tên</label>
                <input type="text" name='fullname' onChange={handleOnChange} value={inforUser?.fullname} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errorUser.fullname && (<span style={{ color: 'red' }}>{errorUser.fullname}</span>)}
              </div>
              <div class=" w-1/2">
                <label for="base-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                <input type="date" name='dayOfBirth' onChange={handleOnChange} value={inforUser?.dayOfBirth} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            </div>
            <div class="mb-3">
              <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" disabled value={inforUser?.email} class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {errorUser.email && (<span style={{ color: 'red' }}>{errorUser.email}</span>)}
            </div>
            <div class="mb-3">
              <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" disabled value={inforUser?.username} class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {errorUser.username && (<span style={{ color: 'red' }}>{errorUser.username}</span>)}
            </div>
            <div className='mb-3'>

              <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white">Role name</label>
              <input type="text" disabled value={inforUser?.roleName} class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            </div>
            <div className='mb-3'>
              <label htmlFor="gender" className="block mb-2 text-lg font-medium text-gray-900">Giới tính</label>
              <div className="flex items-center mb-4">
                <input

                  id="male-radio"
                  type="radio"
                  value={1}
                  name="gender"
                  checked={inforUser && inforUser?.gender === 1} // Kiểm tra nếu giới tính là male
                  onChange={handleOnChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="male-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
              </div>
              <div className="flex items-center">
                <input
                  id="female-radio"
                  type="radio"
                  value={0}
                  name="gender"
                  checked={inforUser && inforUser?.gender === 0} // Kiểm tra nếu giới tính là female
                  onChange={handleOnChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="female-radio" className="ms-2 text-sm font-medium text-gray-900">Nữ</label>
              </div>
            </div>
            <div class="flex justify-center gap-8 mt-6 ml-6 mb-16 space-x-3 rtl:space-x-reverse">

              <Link to="/userlist">
                <button
                  type="button"
                  className="text-red-600 mb-8 hover:scale-x-110 transition-transform duration-300 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                >
                  <u>
                    <b>Trở lại</b>
                  </u>
                </button>
              </Link>

              <button onClick={handleUpdate} className="text-white mb-8 hover:scale-x-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto" type="submit">
                Lưu
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditUser