import React, { useState } from 'react'
import { Boxes } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drug_initial = {
  type: '',
  name: '',
  state: '',
  description: '',
  simpleDescription: '',
  clinicalDescription: '',
  approvalStatus: 0
}

const drug_error = {
  type: '',
  name: '',
  state: '',
  description: '',
  simpleDescription: '',
  clinicalDescription: '',
}

const CreateDrug = () => {

  const [drug, setDrug] = useState(drug_initial);
  const [errorDrug, setErrorDrug] = useState(drug_error)
  const getDataDrug = (e) => {
    setDrug({ ...drug, [e.target.name]: e.target.value })
  }

  const handleValidation = (drug) => {
    const newErrors = { ...errorDrug };
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isValid = false;
    if (!drug) {
      isValid = true;
      return isValid
    }
    if (drug?.type.trim() === '') {
      errorDrug.type = "Loại thuốc không được bỏ trống!!!";
      isValid = true;
    } else if (specialCharacters.test(drug.type)) {
      errorDrug.type = "Không được có ký tự đặc biệt!!!"
      isValid = true;
    }
    if (drug?.name.trim() === '') {
      errorDrug.name = "Tên thuốc không được bỏ trống!!!";
      isValid = true;
    } else if (specialCharacters.test(drug.name)) {
      errorDrug.name = "Không được có ký tự đặc biệt!!!"
      isValid = true;
    }
    if (drug?.state.trim() === '') {
      errorDrug.state = "Trạng thái thuốc không được bỏ trống!!!";
      isValid = true;
    } else if (specialCharacters.test(drug.state)) {
      errorDrug.state = "Không được có ký tự đặc biệt!!!"
      isValid = true;
    }
    if (drug?.description.trim() === '') {
      errorDrug.description = "Mô tả thuốc không được bỏ trống!!!";
      isValid = true;
    } else if (specialCharacters.test(drug.description)) {
      errorDrug.description = "Không được có ký tự đặc biệt!!!"
      isValid = true;
    }
    if (drug?.simpleDescription.trim() === '') {
      errorDrug.simpleDescription = "Mô tả thuốc không được bỏ trống!!!";
      isValid = true;
    } else if (specialCharacters.test(drug.simpleDescription)) {
      errorDrug.simpleDescription = "Không được có ký tự đặc biệt!!!"
      isValid = true;
    }
    if (drug?.clinicalDescription.trim() === '') {
      errorDrug.clinicalDescription = "Mô tả thuốc không được bỏ trống!!!";
      isValid = true;
    } else if (specialCharacters.test(drug.clinicalDescription)) {
      errorDrug.clinicalDescription = "Không được có ký tự đặc biệt!!!"
      isValid = true;
    }
    setErrorDrug(newErrors);
    return isValid;
  }

  const handleCreate = async (event) => {
    event.preventDefaut();
    try {
      if (!handleValidation) {
        toast.success('Thêm mới thành công!', { autoClose: 200 });
      }
    } catch (error) {
      toast.error('Thêm mới thất bại!', { autoClose: 200 })
      throw error
    }
  }

  return (
    <>
      <div className='mt-28 mb-16'>
        <ToastContainer></ToastContainer>
        <div className='py-8 flex px-48'>
          <h1 className=' italic text-3xl font-extrabold text-blue-900 flex'>
            <Boxes size={48}></Boxes>
            <span className='ml-2'>Thêm mới hoạt chất</span>
          </h1>
        </div>
        <div className='w-5/12 mx-auto shadow-xl rounded-b-3xl'>
          <div className='bg-blue-900 mt-4 h-12 rounded-t-3xl'><h2 className='text-center pt-2 font-bold text-white text-xl'>Hoạt chất</h2></div>
          <form className='mt-6 w-3/4 mx-auto'>
            <div className='mb-3 mt-4'>
              <div class="mb-3 w-full">
                <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Loại</label>
                <input type="text" name='type' onChange={getDataDrug} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div class="mb-3 w-full">
                <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Tên</label>
                <input type="text" name='name' onChange={getDataDrug} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div class="mb-3 w-full">
                <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Trạng thái</label>
                <input type="text" name='state' onChange={getDataDrug} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div class="mb-3 w-full">
                <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Mô tả</label>
                <textarea rows={3} type="text" onChange={getDataDrug} name='description' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div class="mb-3 w-full">
                <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Mô tả đơn giản</label>
                <textarea rows={3} type="text" onChange={getDataDrug} name='simpleDescription' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div class="mb-3 w-full">
                <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Mô tả chi tiết</label>
                <textarea rows={3} type="text" onChange={getDataDrug} name='clinicalDescription' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
              <div className='mb-3'>
                <label htmlFor="gender" className="block mb-2 text-lg font-medium text-gray-900">Trạng thái phê duyệt</label>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    value={1}
                    name="approvalStatus"
                    onChange={getDataDrug}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="drug-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Được phê duyệt</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={0}
                    name="approvalStatus"
                    onChange={getDataDrug}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="drug-radio" className="ms-2 text-sm font-medium text-gray-900">Chưa được phê duyệt</label>
                </div>
              </div>
            </div>
            <div class="flex justify-center gap-8 mt-6 ml-6 mb-16 space-x-3 rtl:space-x-reverse">

              <Link to="/druglist">
                <button
                  type="button"
                  className="text-red-600 mb-8 hover:scale-x-110 transition-transform duration-300 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                >
                  <u>
                    <b>Trở lại</b>
                  </u>
                </button>
              </Link>

              <button type='button' onClick={handleCreate} className="text-white mb-8 hover:scale-x-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto">
                Thêm mới
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateDrug