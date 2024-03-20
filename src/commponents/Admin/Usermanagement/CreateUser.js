import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { createUser } from '../../../redux/userlistManagement/userSlice'
import { uploadImage } from '../../../redux/profile/ProfileSlice';

const CreateUser = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const [avatar, setAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [users, setUsers] = useState({
    roleID: '',
    fullName: '',
    username: '',
    email: '',
    gender: 'male',
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn('No file selected');
      return;
    }
    setAvatar(file);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      const dataToUpload = {
        ...users,
        file: selectedFile,
      };
      await dispatch(uploadImage(dataToUpload));
    } catch (error) {
      console.log('Error uploading avatar:', error);
    }
  };

  const [errors, setErrors] = useState({
    roleID: '', fullName: '', email: '', dob: '', username: '',
  });

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

  const handleValidationEmail = async (field) => {
    if (field === 'email') {
      const email = users.email.trim();
      const emailPattern = /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/; // Thêm lựa chọn cho domain fpt.edu.vn
      if (!email) {
        setErrors({ ...errors, email: 'This field is required' });
      } else if (!emailPattern.test(email)) {
        setErrors({
          ...errors,
          email: 'Invalid email format (must be @gmail.com or @fpt.edu.vn)',
        });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
  }

  useEffect(() => {
    if (!token) {
      Navigate('/')
    }
  }, [token])

  const handleValidation = (fieldName) => {
    const newErrors = { ...errors };
    let formIsValid = true;
    switch (fieldName) {
      case 'roleID':
        if (!users.roleID) {
          newErrors.roleID = 'This field is required';
          formIsValid = false;
        } else {
          newErrors.roleID = '';
        }
        break;
      case 'fullName':
        if (!users.fullName) {
          newErrors.fullName = 'This field is required';
          formIsValid = false;
        } else {
          newErrors.fullName = '';
        }
        break;
      case 'username':
        if (!users.username) {
          newErrors.username = 'This field is required';
          formIsValid = false;
        } else {
          newErrors.username = '';
        }
        break;

      case 'dob':
        if (!users.dob) {
          newErrors.dob = 'This field is required';
          formIsValid = false;
        } else {
          newErrors.dob = '';
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return formIsValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = ['username', 'roleID', 'fullName', 'username', 'dob'].filter(field => !users[field]);
    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        setErrors({ ...errors, [field]: 'This field is required' });
      });
      setErrors({ ...errors, empty: 'There are empty fields. Please fill them in.' });
    } else {
      setErrors({ ...errors, empty: '' });
      const isFormValid = handleValidation();
      if (isFormValid) {
        try {
          await dispatch(createUser(users));
          await handleUpload();
          Swal.fire({
            title: "Success!",
            text: "Thêm mới nhân viên thành công!",
            icon: "success",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            Navigate('/userlist', { newUser: users });
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            html: "<span style='color:red; font-weight:bold;'>Error to create a new user!</span>",
            icon: "error",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
      }
    }
  };

  console.log(users)
  return (
    <>
      <div className='mt-28 mb-10 bg-slate-50 w-1/3 mx-auto shadow-2xl border-separate rounded-b-3xl'>
        <div className='bg-blue-900 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Tạo mới nhân viên</h2></div>
        <div className='w-3/4 mx-auto mt-6'>

          <div className='text-center'>
            <div className='mb-3 mt-3 ml-14'>
              <img
                src={selectedFile ? URL.createObjectURL(selectedFile) : (selectedFile || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere.png')}
                alt='Avatar Preview'
                className='logo object-cover rounded-full h-40 w-40'
              />
            </div>
            <input onChange={handleAvatarChange} accept="image/*" type="file" className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="large_size" />
          </div>



          <div class="mb-3">
            {errors.empty && <div className="text-red-500 mb-3">{errors.empty}</div>}
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Role:</label>
            <select id='role' name='roleID' value={users.roleID} onChange={getUserData} onBlur={() => handleValidation('roleID')}
              className={`drop-shadow-md w-96 h-8 mt-3 mb-3 form-select ${errors.role ? 'is-invalid' : ''}`}>
              <option>Select one</option>
              <option value="1">Admin</option>
              <option value="2">Secretary</option>
            </select>
            {errors.roleID && <div className="invalid-feedback text-red-500">{errors.roleID}</div>}
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Username:</label>
            <input type="text" id='username' name='username' required="" placeholder='Nhập username' onChange={getUserData} onBlur={() => handleValidation('username')} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.username ? 'is-invalid' : ''} `} />
            {errors.username && <div className="invalid-feedback text-red-500">{errors.username}</div>}
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Họ và tên:</label>
            <input type="text" id='name' name='fullName' required="" placeholder='Nhập họ và tên' onChange={getUserData} onBlur={() => handleValidation('fullName')} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.fullName ? 'is-invalid' : ''} `} />
            {errors.fullName && <div className="invalid-feedback text-red-500">{errors.fullName}</div>}
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Email:</label>
            <input type="email" id='email' name='email' placeholder='Nhập email' onBlur={() => handleValidationEmail('email')} onChange={getUserData} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.email ? 'is-invalid' : ''} `} />
            {errors.email && <div className="invalid-feedback text-red-500">{errors.email}</div>}
          </div>
          <div class="mb-3">
            <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Ngày sinh:</label>
            <input type="date" id="dob" name="dob" onChange={getUserData} onBlur={() => handleValidation('dob')} class={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${errors.dob ? 'is-invalid' : ''}`} />
            {errors.dob && <div className="invalid-feedback text-red-500">{errors.dob}</div>}
          </div>

          <ul className='flex justify-center mt-5 mb-7'>
            <li><span className='mr-20'>Giới tính</span></li>
            <li class="gender-radio">
              <input type="radio" id="male" name="gender" value="1" checked={users.gender === "1"} onChange={getUserData} className='drop-shadow-md mr-1 form-check-input custom-radio' />
              <label for="nam" className='mr-10'>Nam</label>

              <input type="radio" id="female" name="gender" value="2" checked={users.gender === "2"} onChange={getUserData} className='drop-shadow-md mr-1 form-check-input custom-radio' />
              <label for="nu">Nữ</label>
            </li>
          </ul>

          <div className='flex justify-center gap-14 row mt-3 mb-3'>
            <Link to={'/userlist'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <button className="text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
                Trở về
              </button>
            </Link>
            <Link to=''>
              <button type='submit' onClick={handleSubmit} className='text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center ml-auto' >
                Tạo mới
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )

}

export default CreateUser