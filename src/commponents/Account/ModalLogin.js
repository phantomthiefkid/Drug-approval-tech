import React from 'react'

export default function ModalLogin({ visible, onClose }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-80 " style={{ padding: '25px' }}>
        <button className='ml-60' onClick={onClose}>X</button>
        <h1 className="font-semibold text-center text-xl text-gray-700 mb-5">
          Đăng nhập
        </h1>
        <div className="flex flex-col">
          <span className='mb-2'>Tên tài khoản</span>
          <input
            type="text"
            className="border p-2 rounded mb-5 drop-shadow-md"
            placeholder="Nhập tên tài khoản"
          />
          <span className='mb-2'>Mật khẩu</span>
          <input
            type="text"
            className="border p-2 rounded mb-5 drop-shadow-md"
            placeholder="Nhập mật khẩu"
          />
          <div className="flex mb-5">
            <div className="flex-grow">
              <input type="checkbox" className="mr-2" />
            </div>
            <div className="">
              <span className="mb-5 mr-32">Nhớ tài khoản</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="px-5 py-2 bg-gray-700 text-white rounded">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  )
}
