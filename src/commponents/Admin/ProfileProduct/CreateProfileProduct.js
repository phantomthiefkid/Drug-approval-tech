import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const CreateProfileProduct = () => {
    const [productTitle, setProductTitle] = useState('');
    const [stepOneTag, setStepOneTag] = useState(true);
    const [stepTwoTag, setStepTwoTag] = useState(false);


    const handleNextStepOne = (title) => {
        setProductTitle(title);
        setStepOneTag(false);
        setStepTwoTag(true);
    };

    const showStepOne = () => {
        setStepOneTag(true);
        setStepTwoTag(false);

    };

    const showStepTwo = () => {
        setStepOneTag(false);
        setStepTwoTag(true);

    };

    return (
        <>
            <div className='mt-20'>
                <div className='py-8 flex px-48'>
                    <h1 className='italic text-3xl font-extrabold text-blue-900 flex'>
                        <span className='ml-2'>Tạo hồ sơ sản phẩm</span>
                    </h1>
                </div>
                <div className="w-2/3 mx-auto px-6 mt-8 mb-8 relative">
                    <div className="bg-gray-200 h-1 w-full rounded-full">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${stepOneTag ? "33%" : "66%"}` }}></div>
                        <div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-4 h-4 rounded-full hover:bg-blue-700 hover:scale-125 transition duration-300" style={{ left: `${stepOneTag ? "33%" : "66%"}` }}></div>
                    </div>
                </div>

                <div className="flex justify-center w-5/6 mx-auto gap-6">
                    <button
                        className={`btn ${stepOneTag ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700'} w-1/3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105`}
                    >
                        Step One
                    </button>
                    <button
                        className={`btn ${stepTwoTag ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700'} w-1/3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105`}
                    >
                        Step Two
                    </button>
                </div>

                {stepOneTag && <StepOne onNext={handleNextStepOne} />}
                {stepTwoTag && <StepTwo productTitle={productTitle} />}

            </div>
        </>
    );
};

export default CreateProfileProduct;
