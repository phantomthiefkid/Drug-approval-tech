import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../../../css/DrugManagement/ModalUpdateDrug.css'
import { updateDrugs, fetchDrugs } from '../../../redux/drugManagement/drugSlice';

const drug_error = {
  type: '',
  name: '',
  state: '',
  description: '',
  simpleDescription: '',
  clinicalDescription: '',
}

const ModalUpdateDrug = ({ isOpen, toggleModal, drug, onUpdateSuccess }) => {
  const [drugUpdate, setDrugUpdate] = useState({});
  const [errorDrug, setErrorDrug] = useState(drug_error)
  const [approvalStatus, setApprovalStatus] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setDrugUpdate(drug || {});
  }, [drug]);

  const handleValidation = (drug) => {
    setErrorDrug({ ...drug_error });
    const specialCharacters = /[@#$%^&*+\=\[\]{}:"\\|<>\/]+/;
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
    return isValid
  }

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio" && name === "approvalStatus") {
      // Xử lý thay đổi trạng thái phê duyệt
      if (value === "1") {
        setApprovalStatus(true);
        setDrugUpdate(prevState => ({
          ...prevState,
          approvalStatus: 1 // Cập nhật trực tiếp trạng thái phê duyệt
        }));
      } else {
        setApprovalStatus(false);
        setDrugUpdate(prevState => ({
          ...prevState,
          approvalStatus: 0 // Cập nhật trực tiếp trạng thái phê duyệt
        }));
      }
    } else {
      // Xử lý các trường dữ liệu khác
      setDrugUpdate(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!handleValidation(drugUpdate)) {
        await dispatch(updateDrugs(drugUpdate))
        toast.success('Cập nhật thành công!', { autoClose: 300 });
        onUpdateSuccess();
        toggleModal();
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <div>
      <div className={`modal ${isOpen ? 'show' : ''} w-2/5 h-3/5`}>
        <div className="modal-content">
          <form className="form-group" >
            <div className="top-modal h-16 flex items-center justify-center  p-4 md:p-5 border-b-2 rounded-t">
              <h2 className="text-2xl font-bold text-center text-gray-900">Chỉnh sửa</h2>
            </div>
            <div className="modal-container">
              <form class="max-w-md mx-auto mt-3">
                <div className='flex gap-6 w-full'>
                  <div class="mb-2 w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại</label>
                    <input type="text" onChange={handleOnChange} name='type' value={drugUpdate.type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                    {errorDrug.type && (<span className='text-red-500'>{errorDrug.type}</span>)}
                  </div>
                  <div class="mb-2 w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                    <input type="text" onChange={handleOnChange} name='name' value={drugUpdate.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                    {errorDrug.name && (<span className='text-red-500'>{errorDrug.name}</span>)}
                  </div>
                </div>
                <div class="mb-2">
                  <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                  <textarea type="text" onChange={handleOnChange} name='description' value={drugUpdate.description} rows={2} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                  {errorDrug.description && (<span className='text-red-500'>{errorDrug.description}</span>)}
                </div>
                <div class="mb-2">
                  <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả cơ bản</label>
                  <textarea type="text" onChange={handleOnChange} value={drugUpdate.simpleDescription} name='simpleDescription' rows={2} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                  {errorDrug.simpleDescription && (<span className='text-red-500'>{errorDrug.simpleDescription}</span>)}
                </div>
                <div class="mb-2">
                  <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả lâm sàng</label>
                  <textarea type="text" onChange={handleOnChange} value={drugUpdate.clinicalDescription} name='clinicalDescription' rows={2} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                  {errorDrug.clinicalDescription && (<span className='text-red-500'>{errorDrug.clinicalDescription}</span>)}
                </div>

                <div className='flex mt-4 mb-6 gap-6'>
                  <div class="w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
                    <input type="text" onChange={handleOnChange} value={drugUpdate.state} name="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " />
                    {errorDrug.state && (<span className='text-red-500'>{errorDrug.state}</span>)}
                  </div>
                  <div className='w-full'>
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái phê duyệt</label>
                    <div className="flex items-center mb-4">
                      <input id="approvalStatus-1"
                        checked={drugUpdate.approvalStatus === 1}
                        onChange={handleOnChange}
                        type="radio"
                        value={1}
                        name="approvalStatus"
                        className="w-4 h-4 ml-6 text-blue-600 bg-gray-100 border-gray-300" />
                      <label for="approvalStatus-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đã phê duyệt</label>
                    </div>
                    <div className="flex items-center">
                      <input id="approvalStatus-2"
                        checked={drugUpdate.approvalStatus === 0}
                        onChange={handleOnChange}
                        type="radio"
                        value={0}
                        name="approvalStatus"
                        className="w-4 h-4 ml-6 text-blue-600 bg-gray-100 border-gray-300" />
                      <label for="approvalStatus-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chưa phê duyệt</label>
                    </div>
                  </div>

                </div>

              </form>

            </div>
            <div class="flex mt-4 ml-6 mb-4 justify-center gap-6 space-x-3 rtl:space-x-reverse">

              <button
                type="button"
                className="text-red-600 hover:scale-125 transition-transform duration-300 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-black focus:z-10"
                onClick={toggleModal}
              >
                <u>
                  <b>Cancel</b>
                </u>
              </button>

              <button onClick={handleUpdate} className="text-white hover:scale-125 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto" type="submit">
                Save
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdateDrug