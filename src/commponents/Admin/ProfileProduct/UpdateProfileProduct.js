import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfileProductsDetail } from '../../../redux/profileProduct/profileProductSlice';
import UpdateStepOne from './UpdateStepOne';
import UpdateStepTwo from './UpdateStepTwo';
import CreateKeepStepTwo from './CreateKeepStepTwo';
const UpdateProfileProduct = () => {
    const id = useParams()
    const [productTitle, setProductTitle] = useState('');
    const [stepOneTag, setStepOneTag] = useState(true);
    const [stepTwoTag, setStepTwoTag] = useState(false);
    const [stepTwoUpdate, setStepTwoUpdate] = useState(false);
    const dispatch = useDispatch()
    const detailProfile = useSelector((state) => state.profileProduct.detail.profileInformation)

    useEffect(() => {
        dispatch(fetchProfileProductsDetail({ id }))
    }, [id, dispatch])

    useEffect(() => {
        if (detailProfile && detailProfile.status) {
            if (detailProfile.status === 'DRAFT') {
                setStepOneTag(true);
                setStepTwoTag(false);
            } else if (detailProfile.status === 'PENDING TO PROCEED') {
                setStepOneTag(false);
                setStepTwoTag(true);
            }
        }
    }, [detailProfile])

    const handleNextStepOne = (title) => {
        setProductTitle(title);
        setStepOneTag(false);
        setStepTwoTag(true);
    }

    // Extracting title and imageURL
    let title = "";
    let imageURL = "";
    if (detailProfile) {
        title = detailProfile.title;
        imageURL = detailProfile.imageURL;
    }

    return (
        <>
            <div className='mt-20'>
                <div className='py-8 flex px-48'>
                    <h1 className='italic text-3xl font-extrabold text-blue-900 flex'>
                        <span className='ml-2'>{title}</span>
                    </h1>
                </div>
                <div className="w-2/3 mx-auto px-6 mt-8 mb-8 relative">
                    <div className="bg-gray-200 h-1 w-full rounded-full">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${stepOneTag ? "33%" : "66%"}` }}></div>
                        <div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-4 h-4 rounded-full hover:bg-blue-700 hover:scale-125 transition duration-300" style={{ left: `${stepOneTag ? "33%" : "66%"}` }}></div>
                    </div>
                </div>

                <div className="flex justify-center w-5/6 mx-auto gap-2">
                    <button
                        className={`btn ${stepOneTag ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700'} w-1/3 h-10`}
                        onClick={() => { setStepOneTag(true); setStepTwoTag(false); }}
                    >
                        Step One
                    </button>
                    <button
                        className={`btn ${stepTwoTag ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700'} w-1/3 h-10`}
                        onClick={() => { setStepOneTag(false); setStepTwoTag(true); }}
                    >
                        Step Two
                    </button>

                </div>
                {/* Passing title and imageURL to UpdateStepOne */}
                {stepOneTag && <UpdateStepOne onNext={handleNextStepOne}></UpdateStepOne>}
                {stepTwoTag && <CreateKeepStepTwo productTitle={productTitle} id={id}></CreateKeepStepTwo>}
            </div>
        </>
    )
}

export default UpdateProfileProduct;
