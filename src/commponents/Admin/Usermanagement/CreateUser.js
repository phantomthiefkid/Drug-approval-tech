import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { createUser } from '../../../redux/userlistManagement/userSlice'

const CreateUser = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const [users, setUsers] = useState({
    roleID: '',
    fullName: '',
    username: '',
    email: '',
    gender: 'male',
  });

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


  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImageSrc(file)


  };

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
  const handleSubmit = (e) => {
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
        dispatch(createUser(users))
          .then((result) => {
            if (result.meta.requestStatus === "rejected") {
              Swal.fire({
                title: "Error!",
                html: "<span style='color:red; font-weight:bold;'>Error to create a new user!</span>",
                icon: "error",
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: "Success!",
                text: "Thêm mới nhân viên thành công!",
                icon: "success",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then(() => {
                Navigate('/', { newUser: users });
              });
            }
          })
          .catch((error) => {
          });
      }
    }
  };


  return (
    <>
      <h1 className='mt-36 ml-72 italic text-3xl font-extrabold text-blue-900'>Quản lý nhân viên</h1>
      <div className='bd mt-14 text-center font-semibold w-2/6'>
        <h2 className='bg-blue-900 h-12 rounded-t-3xl text-center pt-2 font-bold text-white text-xl'>Thêm mới nhân viên</h2>
        <div>
          <ul className='item-menu flex justify-center'>
            <li>
              <div className='w-full mx-auto'>
                <img
                src={imageSrc ? URL.createObjectURL(imageSrc) : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
                alt="profile"
                className="w-44 h-32 border mb-4 mx-auto"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 w-full"
              />
              </div>
            </li>
          </ul>
          {/* <form onSubmit={handleSub9mit}> */}
          <ul>
            {errors.empty && <div className="text-red-500 mb-3">{errors.empty}</div>}
            <li className='form-item '><span>Role</span></li>
            <li className="custom-input">
              <select id='role' name='roleID' value={users.roleID} onChange={getUserData} onBlur={() => handleValidation('roleID')}
                className={`drop-shadow-md w-96 h-8 mt-3 mb-3 form-select ${errors.role ? 'is-invalid' : ''}`}>
                <option>Select one</option>
                <option value="1">Admin</option>
                <option value="2">Secretary</option>
              </select>
              {errors.roleID && <div className="invalid-feedback text-red-500">{errors.roleID}</div>}
            </li>

            <li className='form-item '><span>Username</span></li>
            <li className="custom-input"><input type="text" id='username' name='username' required="" placeholder='Nhập username' onChange={getUserData} onBlur={() => handleValidation('username')}
              className={`drop-shadow-md w-96 h-8 mt-3 mb-3 ${errors.username ? 'is-invalid' : ''}`}>
            </input>
              {errors.username && <div className="invalid-feedback text-red-500">{errors.username}</div>}
            </li>

            <li className='form-item '><span>Họ và tên</span></li>
            <li className="custom-input"><input type="text" id='name' name='fullName' required="" placeholder='Nhập họ và tên' onChange={getUserData} onBlur={() => handleValidation('fullName')}
              className={`drop-shadow-md w-96 h-8 mt-3 mb-3 form-control ${errors.fullName ? 'is-invalid' : ''}`}>
            </input>
              {errors.fullName && <div className="invalid-feedback text-red-500">{errors.fullName}</div>}
            </li>

            <li className='form-item '><span>Email</span></li>
            <li className="custom-input"><input type="email" id='email' name='email' placeholder='Nhập email' onBlur={() => handleValidationEmail('email')} onChange={getUserData}
              className={`drop-shadow-md w-96 h-8 mt-3 mb-3 form-control ${errors.email ? 'is-invalid' : ''}`}>
            </input>
              {errors.email && <div className="invalid-feedback text-red-500">{errors.email}</div>}
            </li>

            <li className='form-item '><span>Ngày sinh</span></li>
            <li className="custom-input"><input type="date" id="dob" name="dob" onChange={getUserData} onBlur={() => handleValidation('dob')}
              className={`drop-shadow-md w-96 h-8 mt-3 mb-3 form-control ${errors.dob ? 'is-invalid' : ''}`}>
            </input>
              {errors.dob && <div className="invalid-feedback text-red-500">{errors.dob}</div>}
            </li>

            <ul className='flex justify-center mt-5 mb-7'>
              <li><span className='mr-20'>Giới tính</span></li>
              <li class="form-check form-check-inline">
                <input type="radio" id="male" name="gender" value="1" checked={users.gender === "1"} onChange={getUserData} className='drop-shadow-md mr-1 form-check-input custom-radio' />
                <label for="male" className='mr-10'>Nam</label>

                <input type="radio" id="female" name="gender" value="2" checked={users.gender === "2"} onChange={getUserData} className='drop-shadow-md mr-1 form-check-input custom-radio' />
                <label for="female">Nữ</label>
              </li>
            </ul>

            <div className='flex justify-center gap-14 row mt-3 mb-5'>
              <Link to={'/userlist'}>
                <button className='text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10'>
                  Trở về
                </button>
              </Link>
              <Link to='/'>
                <button className='text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center ml-auto' type='submit' onClick={handleSubmit} >
                  Tạo mới
                </button>
              </Link>
            </div>
          </ul>
          {/* </form> */}
        </div>
      </div>
    </>
  )

}

export default CreateUser