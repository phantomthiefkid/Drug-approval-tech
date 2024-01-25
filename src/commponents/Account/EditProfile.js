import React from 'react'
import { Link } from 'react-router-dom';
import '../../css/Profile.css'
import Navigation from '../Navbar/Navigation';

const EditProfile = () => {
    return (
        <>
            <Navigation />
            <div className='bd mt-48 text-center font-semibold w-2/6'>
                <h2 className='bg text-center text-white text-xl'>Hồ sơ</h2>
                <div>
                    <ul className='item-menu flex justify-center'>
                        <li>
                            <img className='logo mb-8 w-20 h-20 border' src='./langtu.jpg' alt='profile'></img>
                        </li>
                    </ul>
                    <ul>
                        <li className='form-item '><span>Họ và tên</span></li>
                        <li className="custom-input"><input type="text" placeholder='Nguyễn Tấn' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Email</span></li>
                        <li className="custom-input"><input type="text" placeholder='nguyentan@gmail.com' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Số điện thoại</span></li>
                        <li className="custom-input"><input type="text" placeholder='0987391600' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Ngày sinh</span></li>
                        <li className="custom-input"><input type="text" placeholder='01/01/2002' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>
                        <ul className='flex justify-center mt-5 mb-7'>
                            <li><span className='mr-20'>Giới tính</span></li>
                            <li class="gender-radio">
                                <input type="radio" id="nam" name="gioiTinh" value="Nam" className='drop-shadow-md mr-1' />
                                <label for="nam" className='mr-10'>Nam</label>

                                <input type="radio" id="nu" name="gioiTinh" value="Nữ" className='drop-shadow-md mr-1' />
                                <label for="nu">Nữ</label>
                            </li>
                        </ul>

                        <div className='flex justify-center row mt-3 mb-3'>
                            <Link to={'/viewprofile'}>
                                <button className='btnCancel mr-10'>
                                    Trở về
                                </button>
                            </Link>
                            <Link to=''>
                                <button className='buttonSave' type='submit'>
                                    Lưu
                                </button>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EditProfile