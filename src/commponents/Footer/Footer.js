import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Footer/Footer.css'
const Footer = () => {

  return (
    <div className='h-72 text-center w-full footer'>
      <div className='grid grid-cols-3'>
        <div className='justify-center mx-auto'>
          <Link to={`/`}><div><img className='w-24 ml-10 mt-10' src='https://s3.ap-northeast-1.amazonaws.com/nguyentan/1711041066763-Remove-bg.ai_1711041054996.png' /><span className='text-blue-950 text-xl font-bold'>DRUG APPROVAL</span><br></br><span className='font-medium text-gray-700'>Technology</span></div></Link>

        </div>
        <div>
          <div className='py-6'>
            <h3 className='text-xl'><b>Quản lí hồ sơ thuốc</b></h3>
            <ul>
              <li>Tạo hồ sơ thuốc</li>
              <li>Duyệt thuốc mới</li>
              <li>Chỉnh sửa hồ sơ thuốc</li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl'><b>Cơ sở quản lý dược</b></h3>
            <ul>
              <li>FDA</li>
              <li>ANSM</li>
              <li>DAV</li>
            </ul>
          </div>
        </div>
        <div>
          <div className='py-6'>
            <h3 className='text-xl'><b>Quản lí người dùng</b></h3>
            <ul>
              <li>Tạo mới accounts </li>
              <li>Vô hiệu hóa accounts</li>
              <li>Chỉnh sửa accounts</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='py-2'><p>© OMx Personal Health Analytics, Inc. 2023 </p></div>
    </div>
  );
};



export default Footer