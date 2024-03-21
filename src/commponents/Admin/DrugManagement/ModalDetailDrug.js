import React, { useState, useEffect } from 'react'
import { XCircle } from 'react-bootstrap-icons';


export default function ModalDetailDrug({ onClose, drug, isOpenDetail }) {

  console.log("modal", drug);

  return (

    <div className="fixed inset-0 bg-black z-10 bg-opacity-5 flex items-center justify-center mt-10">
      <div className="bg-white rounded w-2/6 p-5">
        <div className='flex justify-end'>
          <button onClick={onClose} className='p-0'>
            <XCircle className='text-gray-500' size={20} />
          </button>
        </div>
        <h1 className="font-semibold text-center text-2xl text-gray-700 mb-5">
          Chi tiết hoạt chất
        </h1>

        <div className="flex flex-col" key={drug.id} >
          <div className="flex justify-between mb-5">
            <div className='mr-5'>
              <span className='mb-2 font-medium'>Tên</span>
              <input
                type="text"
                className="border p-2 rounded drop-shadow-md ml-1"
                name='name'
                value={drug.name}

                readOnly
              />
            </div>
            <div>
              <span className='mb-2 font-medium'>Loại</span>
              <input
                type="text"
                className="border p-2 rounded drop-shadow-md ml-1"
                name='type'
                value={drug.type}
                readOnly
              />
            </div>
          </div>

          <span className='mb-2 font-medium'>Tình trạng</span>
          <input
            type="text"
            className="border p-2 rounded mb-5 drop-shadow-md"
            name='state'
            value={drug.state}
            readOnly
          />
          <span className='mb-2 font-medium'>Mô tả</span>
          <textarea
            type="text"
            className="border p-3 rounded mb-5 drop-shadow-md"
            name='description'
            value={drug.description}
            readOnly
          />
          <span className='mb-2 font-medium'>Mô tả cơ bản</span>
          <textarea
            type="text"
            className="border p-3 rounded mb-5 drop-shadow-md"
            name='simpleDescription'
            value={drug.simpleDescription}
            readOnly
          />
          <span className='mb-2 font-medium'>Mô tả lâm sàng</span>
          <textarea
            type="text"
            className="border p-3 rounded mb-5 drop-shadow-md"
            name='clinicalDescription'
            value={drug.clinicalDescription}
            readOnly
          />
        </div>

      </div>
    </div>

  )
}