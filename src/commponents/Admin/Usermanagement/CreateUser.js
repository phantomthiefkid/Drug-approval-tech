import React from 'react'
import { Link } from 'react-router-dom';
import Navigation from '../../Navbar/Navigation';

const CreateUser = () => {
    return (
        <>
            <Navigation />
            <h1 className='mt-48 ml-72 italic text-3xl font-extrabold'>Quản lý nhân viên</h1>
            <div className='bd mt-14 text-center font-semibold w-2/6'>
                <h2 className='bg text-center text-white text-xl'>Thêm mới nhân viên</h2>
                <div>
                    <ul className='item-menu flex justify-center'>
                        <li>
                            <img className='logo mb-8 w-20 h-20 border' src='./langtu.jpg' alt='profile'></img>
                        </li>
                    </ul>
                    <ul>
                        <li className='form-item '><span>Họ và tên</span></li>
                        <li className="custom-input"><input type="text" placeholder='Nhập họ và tên' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Email</span></li>
                        <li className="custom-input"><input type="text" placeholder='Nhập email' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Số điện thoại</span></li>
                        <li className="custom-input"><input type="text" placeholder='Nhập số điện thoại' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Địa chỉ</span></li>
                        <li className="custom-input"><input type="text" placeholder='Nhập địa chỉ' className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

                        <li className='form-item '><span>Ngày sinh</span></li>
                        <li className="custom-input"><input type="text" className='drop-shadow-md w-96 h-8 mt-3 mb-3'></input></li>

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
                            <Link to={'/'}>
                                <button className='btnCancel mr-10'>
                                    Trở về
                                </button>
                            </Link>
                            <Link to='/'>
                                <button className='buttonSave' type='submit'>
                                    Tạo mới
                                </button>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CreateUser