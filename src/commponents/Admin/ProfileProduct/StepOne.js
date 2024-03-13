import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfileProductStepOne } from '../../../redux/profileProduct/profileProductSlice';
const StepOne = ({ onNext }) => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const stepOne = { title: title, status: 'PENDING' };
        const response = await dispatch(createProfileProductStepOne(stepOne));
        const id = response.payload.id; 
        onNext(id); 
    };
    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };
    return (
        <div className='w-5/6 mb-5 mt-2 mx-auto h-auto min-h-96 border border-gray-200 shadow-xl'>

            <div className='w-full p-6 text-center shadow-inner'>
                <h1 className='italic text-xl font-sans font-bold text-blue-900'>
                    Tên hồ sơ sản phẩm
                </h1>
            </div>
            <div className="w-2/3 mx-auto h-52 p-6 flex justify-center items-center">
                <input
                    type="text"
                    className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Nhập tên hồ sơ sản phẩm"
                    onChange={handleOnChange}
                />
            </div>
            <div className='flex justify-end gap-4 mr-16'>
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Draft
                </button>

                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepOne;
