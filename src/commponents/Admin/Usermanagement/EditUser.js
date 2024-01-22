import React, { useEffect, useState } from 'react'
import { PenFill } from 'react-bootstrap-icons'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navigation from '../../Navbar/Navigation'
import Footer from '../../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, updateUsers } from '../../../redux/userlistManagement/userSlice'


const initialUser = {
  fullName: "",
  gender: true,
  email: "",
  password: "",
  role: 5,
  id: "",
  dob: ''
}

const EditUser = () => {
  const { id } = useParams();
  const usersAPI = useSelector((user) => user.userlist.data)
  const [inforUser, setInforUser] = useState(initialUser);
  const [errorUser, setErrorUser] = useState(initialUser)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(usersAPI)) {
      const foundUser = usersAPI.find((item) => item.id == id);
      setInforUser(foundUser)
    }
  }, [id, usersAPI]);

  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue;

    if (type === 'radio') {
      newValue = value === 'true';
    }

    if (name === 'role') {
      newValue = parseInt(value)
    } 

    if (name === 'fullName' || name === 'email' || name === 'dob' || name === 'password') {
      newValue = value
    }

    setInforUser((prevInfo) => ({
      ...prevInfo,
      [name]: newValue,
    }));
    console.log(inforUser)

  };

  useEffect(() => {
    console.log(inforUser.gender);
  }, [inforUser.gender]);

  const validationUserUpdate = (user) => {
    const error = { ...initialUser }
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isValid = false;
  
    if (!user) {
      isValid = true
      return isValid;
    }
    if (user?.fullName.trim() === '') {
      error.fullName = 'Họ và tên không được để trống!!!';
      isValid = true;
    } else if (specialCharacters.test(user.fullName)) {
      error.fullName = 'Họ và tên không được có ký tự đặc biệt'
      isValid = true;
    }

    if (user?.email.trim() === '') {
      error.email = 'Email không được để trống!!!';
      isValid = true;
    } else if (!user.email.endsWith('@gmail.com')) {
      error.email = 'Email phải có đuôi là @gmail.com!!!';
      isValid = true;
    }

    if (user?.password.trim() === '') {
      error.password = 'Mật khẩu không được để trống!!!'
      isValid = true;
    } else if (!/\d/.test(user.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(user.password)) {
      error.password = 'Mật khẩu phải chứa ít nhất một chữ số và ít nhất một ký tự đặc biệt';
      isValid = true;
    }

    setErrorUser(error);
    return isValid
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!validationUserUpdate(inforUser)) {
      await dispatch(updateUsers(inforUser)).then(() => {navigate('/userlist')});
    
    }
  }
  


  return (
    <>
      
        <Navigation />
    
      <div className='mt-32 bg-slate-50 w-2/3 mx-auto shadow-xl'>
        <div className='py-8 flex justify-start ml-20'>
          <h3 className='text-5xl font-serif font-thin text-emerald-500 flex'>
            <PenFill></PenFill>
            <span className='ml-2'>Chỉnh sửa</span>
          </h3>

        </div>
        <div className=''>
          <form className='w-2/3 mx-auto'>
            <div className='flex justify-end mr-4'><img className='w-28 rounded-full border-4 border-green-400' src='https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/405341235_1774049269674530_8472061970839104134_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=XnQAKh7iRzMAX-EtLOi&_nc_oc=AQlaDyIHKn1Tey3KBNwNptBCXWwan0-UVt348gZmZXpTAlI1FUG2_y6T1MEHA_B__jg&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDH_wybaZi6KgKWYmlcG0Po4vv6b0Ve60J0V3fzdzz1sg&oe=65B13530' /></div>
            <div className='flex mb-3 gap-6'>
              <div class=" w-1/2">
                <label for="base-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Họ và tên</label>
                <input type="text" name='fullName' onChange={handleOnChange} value={inforUser?.fullName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errorUser.fullName && (<span style={{color: 'red'}}>{errorUser.fullName}</span>)}
              </div>
              <div class=" w-1/2">
                <label for="base-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                <input type="date" name='dob' onChange={handleOnChange} value={inforUser?.dob} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            </div>
            <div class="mb-3">
              <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" name='email' onChange={handleOnChange} value={inforUser?.email} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {errorUser.email && (<span style={{color: 'red'}}>{errorUser.email}</span>)}
            </div>
            <div class="mb-3">
              <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white">Mật khẩu</label>
              <input type="password" name='password' onChange={handleOnChange} value={inforUser?.password} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {errorUser.password && (<span style={{color: 'red'}}>{errorUser.password}</span>)}
            </div>
            <div className='mb-3'>

              <label for="role" class="block mb-2 text-lg  font-medium text-gray-900 dark:text-white">Change role</label>
              <select id="role" onChange={handleOnChange} name="role" value={inforUser?.role} class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose role</option>
                <option value={1}>Admin</option>
                <option value={2}>Employee</option>
                <option value={3}>Customer</option>

              </select>

            </div>
            <div className='mb-3'>
              <label htmlFor="gender" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Gender</label>
              <div className="flex items-center mb-4">
                <input
                  id="male-radio"
                  type="radio"
                  value={true}
                  name="gender"
                  checked={inforUser?.gender === true} // Kiểm tra nếu giới tính là male
                  onChange={handleOnChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="male-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
              </div>
              <div className="flex items-center">
                <input
                  id="female-radio"
                  type="radio"
                  value={false}
                  name="gender"
                  checked={inforUser?.gender === false} // Kiểm tra nếu giới tính là female
                  onChange={handleOnChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="female-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
              </div>
            </div>
            <div class="flex justify-end gap-8 mt-6 ml-6 mb-6 space-x-3 rtl:space-x-reverse">

              <Link to="/userlist">
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  <u>
                    <b>Trở lại</b>
                  </u>
                </button>
              </Link>

              <button onClick={handleUpdate} className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
                Lưu
              </button>

            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default EditUser