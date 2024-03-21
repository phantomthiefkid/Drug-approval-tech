import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import '../../css/Profile.css'

import { viewProfile, updateProfile, uploadImage } from '../../redux/profile/ProfileSlice';

const EditProfile = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const email = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
  const profileView = useSelector((state) => state.viewProfile.data)

  const [avatar, setAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [profileUpdate, setProfileUpdate] = useState({
    fullname: '',
    dayOfBirth: '',
    gender: 0,
    avatar: ''
  });

  useEffect(() => {
    if (!token) {
      Navigate('/')
    }
  }, [token])

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
      title: "Thông tin của bạn sẽ không được lưu?",
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

  const handleChangAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn('No file selected');
      return;
    }

    const dataUrl = await readFileAsDataURL(file);
    setProfileUpdate((prevUser) => ({
      ...prevUser,
      avatar: dataUrl,
    }));

    setAvatar(dataUrl);
    setSelectedFile(file);
  };
  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("====> Check: ", profileUpdate)
    try {
      const resultUpdate = await dispatch(updateProfile({ ...profileUpdate, avatar: profileUpdate.avatar }));
      if (updateProfile.fulfilled.match(resultUpdate)) {
        await dispatch(viewProfile(email));
        const dataToUpload = {
          ...profileUpdate,
          file: selectedFile,
        };
        await dispatch(uploadImage(dataToUpload));

        Swal.fire({
          title: 'Success!',
          text: 'Cập nhật hồ sơ thành công!',
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
        text: ` ${error.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  };


  if (profileView && profileView.isLoading) {
    return <div>Loading...</div>;
  }
  console.log(profileUpdate);
  console.log("Avatar URL:", profileUpdate.avatar);

  return (
    <>
      <div className='mt-28 mb-10 bg-slate-50 w-1/3 mx-auto shadow-2xl border-separate rounded-b-3xl'>
        <div className='bg-blue-900 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Hồ sơ</h2></div>
        <div className='w-3/4 mx-auto mt-6'>
          <div className='text-center'>
            <div className='mb-3 mt-3 ml-14'>
              <img
                src={avatar || profileUpdate.avatar || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere.png'}
                alt='Avatar Preview'

                className='logo object-cover rounded-full h-40 w-40'
              />
            </div>
            <input
              type='file'
              id='avatar'
              name='avatar'
              accept='image/*'
              className='avatar-input mb-5 ml-20'
              onChange={handleChangAvatar}
            />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Role:</label>
            <input type="text" name='roleName' disabled value={profileUpdate.roleName} class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Họ và tên:</label>
            <input type="text" name='fullname' value={profileUpdate.fullname} onChange={handleChange} class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Email:</label>
            <input type="email" name='email' value={profileUpdate.email} disabled class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Ngày sinh:</label>
            <input type="date" id='datepicker' name='dayOfBirth' value={profileUpdate.dayOfBirth} onChange={handleChange} class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
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
              <button type='submit' onClick={handleSubmit} className='text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center ml-auto' >
                Lưu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile