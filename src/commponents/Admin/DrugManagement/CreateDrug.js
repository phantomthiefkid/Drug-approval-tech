import React, { useState, useEffect } from 'react'
import { Boxes } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createDrugs } from '../../../redux/drugManagement/drugSlice';
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drug, setDrug] = useState(drug_initial);
  const [errorDrug, setErrorDrug] = useState(drug_error)
  const [drugImage, setDrugImage] = useState('')
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
        navigate('/')
    }
}, [token])
  const getDataDrug = (e) => {
    setDrug({ ...drug, [e.target.name]: e.target.value })
  }

  const handleApprovalStatusChange = (newValue) => {
    setDrug({ ...drug, approvalStatus: newValue });
  };

  const handleValidation = (drug) => {
    setErrorDrug({ ...drug_error });
    const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
    let isValid = false;
    if (!drug) {
      isValid = true;
      return isValid
    }
    if (drug?.type.trim() === '') {
      setErrorDrug(prevState => ({ ...prevState, type: "Loại thuốc không được bỏ trống!!!" }));
      isValid = true;
    } else if (specialCharacters.test(drug.type)) {
      setErrorDrug(prevState => ({ ...prevState, type: "Loại thuốc được có ký tự đặc biệt!!!" }));
      isValid = true;
    }
    if (drug?.name.trim() === '') {
      setErrorDrug(prevState => ({ ...prevState, name: "Tên thuốc không được bỏ trống!!!" }));
      isValid = true;
    } else if (specialCharacters.test(drug.name)) {
      setErrorDrug(prevState => ({ ...prevState, name: "Tên thuốc được có ký tự đặc biệt!!!" }));
      isValid = true;
    }
    if (drug?.state.trim() === '') {
      setErrorDrug(prevState => ({ ...prevState, state: "Trạng thái thuốc không được bỏ trống!!!" }));
      isValid = true;
    } else if (specialCharacters.test(drug.state)) {
      setErrorDrug(prevState => ({ ...prevState, state: "Trạng thái thuốc không được có ký tự đặc biệt!!!" }));
      isValid = true;
    }
    if (drug?.description.trim() === '') {
      setErrorDrug(prevState => ({ ...prevState, description: "Mô tả về thuốc không được bỏ trống!!!" }));
      isValid = true;
    } else if (specialCharacters.test(drug.description)) {
      setErrorDrug(prevState => ({ ...prevState, description: "Mô tả về thuốc không được có ký tự đặc biệt!!!" }));
      isValid = true;
    }
    if (drug?.simpleDescription.trim() === '') {
      setErrorDrug(prevState => ({ ...prevState, simpleDescription: "Mô tả về thuốc không được bỏ trống!!!" }));
      isValid = true;
    } else if (specialCharacters.test(drug.simpleDescription)) {
      setErrorDrug(prevState => ({ ...prevState, simpleDescription: "Mô tả về thuốc không được có ký tự đặc biệt!!!" }));
      isValid = true;
    }
    if (drug?.clinicalDescription.trim() === '') {
      setErrorDrug(prevState => ({ ...prevState, clinicalDescription: "Mô tả về thuốc không được bỏ trống!!!" }));
      isValid = true;
    } else if (specialCharacters.test(drug.clinicalDescription)) {
      setErrorDrug(prevState => ({ ...prevState, clinicalDescription: "Mô tả về thuốc không được có ký tự đặc biệt!!!" }));
      isValid = true;
    }
    return isValid;
  }

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      if (!handleValidation(drug)) {
        await dispatch(createDrugs(drug))
        toast.success('Thêm mới thành công!', { autoClose: 200 });
        setTimeout(() => {
          navigate(`/druglist`);
        }, 1000);
      } else {
        toast.error('Thêm mới thất bại!', { autoClose: 200 })
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
          <h1 className=' italic text-3xl font-extrabold text-blue-800 flex'>
            <Boxes size={48}></Boxes>
            <span className='ml-2'>Thêm mới hoạt chất</span>
          </h1>
        </div>
        <div className='w-5/6 mx-auto shadow-sm shadow-gray-400 '>
          <div className='bg-blue-600 mt-4 h-12 '><h2 className='text-center pt-2 font-bold text-white text-xl'>Hoạt chất</h2></div>
          <form className='py-10 w-5/6 mx-auto grid grid-cols-12 gap-8'>
            <div className='col-span-5 py-12'>
              <img className='border-2 rounded-xl' src={`${drugImage ? drugImage: "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"}`} alt='drug' />
            </div>
            <div className='col-span-7'>
              <div className='w-4/5'>
                <div className='flex gap-6'>
                  <div class="mb-3 w-full">
                    <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Loại</label>
                    <input type="text" name='type' onChange={getDataDrug} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errorDrug.type && (<span className='text-red-500'>{errorDrug.type}</span>)}
                  </div>
                  <div class="mb-3 w-full">
                    <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Tên</label>
                    <input type="text" name='name' onChange={getDataDrug} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errorDrug.name && (<span className='text-red-500'>{errorDrug.name}</span>)}
                  </div>
                </div>
                <div class="mb-3 w-full">
                  <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Trạng thái</label>
                  <input type="text" name='state' onChange={getDataDrug} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {errorDrug.state && (<span className='text-red-500'>{errorDrug.state}</span>)}
                </div>
                <div class="mb-3 w-full">
                  <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Mô tả</label>
                  <textarea rows={2} type="text" onChange={getDataDrug} name='description' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {errorDrug.description && (<span className='text-red-500'>{errorDrug.description}</span>)}
                </div>
                <div class="mb-3 w-full">
                  <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Mô tả cơ bản</label>
                  <textarea rows={2} type="text" onChange={getDataDrug} name='simpleDescription' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {errorDrug.simpleDescription && (<span className='text-red-500'>{errorDrug.simpleDescription}</span>)}
                </div>
                <div class="mb-3 w-full">
                  <label for="base-input" class="block mb-2 text-lg  font-medium text-gray-900">Mô tả chi tiết</label>
                  <textarea rows={2} type="text" onChange={getDataDrug} name='clinicalDescription' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {errorDrug.clinicalDescription && (<span className='text-red-500'>{errorDrug.clinicalDescription}</span>)}
                </div>
                <div className='mb-3'>
                  <label htmlFor="drug-radio" className="block mb-2 text-lg font-medium text-gray-900">Trạng thái phê duyệt</label>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      value={1}
                      name="approvalStatus"
                      onChange={() => handleApprovalStatusChange(1)}
                      checked={drug.approvalStatus === 1}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="drug-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Được phê duyệt</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value={0}
                      name="approvalStatus"
                      onChange={() => handleApprovalStatusChange(0)}
                      checked={drug.approvalStatus === 0}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="drug-radio" className="ms-2 text-sm font-medium text-gray-900">Chưa được phê duyệt</label>
                  </div>
                </div>
              </div>
              <div class="flex justify-start mt-4 gap-16 ml-6 space-x-3 rtl:space-x-reverse">

                <Link to="/druglist">
                  <button
                    type="button"
                    className="text-red-600 mb-8 hover:scale-x-125 transition-transform duration-300 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                  >
                    <u>
                      <b>Trở lại</b>
                    </u>
                  </button>
                </Link>

                <button type='button' onClick={handleCreate} className="text-white mb-8 hover:scale-x-125 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto">
                  Thêm mới
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateDrug