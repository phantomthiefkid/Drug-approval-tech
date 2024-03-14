import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProfileProductStepOne, updateProfileProductStepOneupdate } from '../../../redux/profileProduct/profileProductSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const StepOne = ({ onNext }) => {
    const [title, setTitle] = useState();
    const [error, setError] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const handleSubmitStepOnePending = async () => {
        const stepOne = { title: title, status: 'PENDING' };
        if (title) {
            const response = await dispatch(createProfileProductStepOne(stepOne));
            if (response) {
                toast.success('Hoàn thành bước 1', { autoClose: 200 })
                setTimeout(() => {
                    const id = response.payload.id;
                    onNext(id);
                }, 1000);
            }
        } else {
            setError(true)
        }

    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setImage(file)
    };

    const handleSaveAsDraft = async () => {
        const stepOne = { title: title, status: 'DRAFT' };
        if (title) {
            const response = await dispatch(createProfileProductStepOne(stepOne))

            if (response) {
                toast.success('Lưu thành công!', { autoClose: 200 });
                setTimeout(() => {
                    navigate('/profilelist');
                }, 1000);
            } else {
                toast.error('Đã có lỗi xảy ra!', { autoClose: 200 });
            }
        } else {
            setError(true)
        }

    };


    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <div className='w-5/6 mb-5 mt-2 mx-auto h-auto min-h-96 border border-gray-200 shadow-xl'>
            <ToastContainer></ToastContainer>
            <div className='w-full p-6 text-center shadow-inner'>
                <h1 className='italic text-3xl font-sans font-bold text-blue-900'>
                    Hồ sơ
                </h1>
            </div>
            <div class="relative mx-auto">
                <input  onChange={handleImageChange} type="file" accept="image/*" class="hidden" id="image-upload" />
                <label for="image-upload" className="cursor-pointer mb-2 block mx-auto">
                <img src={image ? URL.createObjectURL(image) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiaH4XnlaUWReFVAIftt0qvvd_Y_ieJWREjOCVsPUTxYW5-DI_8oGctr8rvffv4zdxSyE&usqp=CAU"} alt="Upload Image" className="object-cover mx-auto rounded-full w-52 border border-gray-300 hover:border-blue-500" />
                </label>
                <p class="text-sm text-gray-500 text-center">Click để tải lên hình ảnh</p>
            </div>

            <div className="w-2/3 mx-auto h-52 p-6 flex justify-center items-center">
                <div className='w-full flex flex-col'>
                    <input
                        type="text"
                        className="w-3/4 mx-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        placeholder="Nhập tên hồ sơ sản phẩm"
                        value={title}
                        onChange={handleOnChange}
                    />
                    <div
                        className="error-message mx-auto"
                        style={{
                            height: error ? 'auto' : '0', // Thiết lập chiều cao
                            overflow: 'hidden' // Ẩn nội dung khi không có lỗi
                        }}
                    >
                        <span className='text-red-600'>Tên hồ sơ không được bỏ trống</span>
                    </div>
                </div>
            </div>


            <div className='flex justify-end gap-4 mr-16 mb-6'>
                <button onClick={handleSaveAsDraft} className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Save as draft
                </button>
                <button onClick={handleSubmitStepOnePending} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepOne;
