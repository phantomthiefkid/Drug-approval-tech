import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const CreateProfileProduct = () => {
    const [productTitle, setProductTitle] = useState('');


    const [stepOneTag, setStepOneTag] = useState(true);
    const [stepTwoTag, setStepTwoTag] = useState(false);
    const [stepThreeTag, setStepThreeTag] = useState(false);

    const handleNextStepOne = (title) => {
        setProductTitle(title);
        setStepOneTag(false);
        setStepTwoTag(true);
    };

    const showStepOne = () => {
        setStepOneTag(true);
        setStepTwoTag(false);
        setStepThreeTag(false);
    };

    const showStepTwo = () => {
        setStepOneTag(false);
        setStepTwoTag(true);
        setStepThreeTag(false);
    };

    const showStepThree = () => {
        setStepOneTag(false);
        setStepTwoTag(false);
        setStepThreeTag(true);
    };

    return (
        <>
            <div className='mt-20'>
                <div className='py-8 flex px-48'>
                    <h1 className='italic text-3xl font-extrabold text-blue-900 flex'>
                        <span className='ml-2'>Tạo hồ sơ sản phẩm</span>
                    </h1>
                </div>
                <div className="w-2/3 mx-auto px-6 mt-8 mb-8">
                    <div className="bg-gray-200 h-1 w-full rounded-full">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                </div>
                <div className="flex justify-center w-5/6 mx-auto gap-2">
                    <button
                        className={`btn ${stepOneTag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} w-1/3 h-10 hover:bg-blue-600 hover:text-white`}
                        onClick={showStepOne}
                    >
                        Step One
                    </button>
                    <button
                        className={`btn ${stepTwoTag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} w-1/3 h-10 hover:bg-blue-600 hover:text-white`}
                        onClick={showStepTwo}
                    >
                        Step Two
                    </button>
                    <button
                        className={`btn ${stepThreeTag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} w-1/3 h-10 hover:bg-blue-600 hover:text-white`}
                        onClick={showStepThree}
                    >
                        Step Three
                    </button>
                </div>
                {stepOneTag && <StepOne onNext={handleNextStepOne} />}
                {stepTwoTag && <StepTwo productTitle={productTitle} />}
                {stepThreeTag && <StepThree />}
            </div>
        </>
    );
};

export default CreateProfileProduct;
