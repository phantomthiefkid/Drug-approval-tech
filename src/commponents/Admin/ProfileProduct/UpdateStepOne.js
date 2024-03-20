import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileProductStepOneupdate } from '../../../redux/profileProduct/profileProductSlice';
import { uploadFile } from '../../../redux/uploadFile/uploadFile';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchProfileProductsDetail } from '../../../redux/profileProduct/profileProductSlice';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateStepOne = ({ onNext }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [dataUpdate, setDataUpdate] = useState({ title: '', imageURL: '', status: "DRAFT" });
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const detailProfile = useSelector((state) => state.profileProduct.detail);

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileProductsDetail({ id }))
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (detailProfile && detailProfile.profileInformation) {
            setTitle(detailProfile.profileInformation.title || '');
            setDataUpdate({
                title: detailProfile.profileInformation.title || '',
                imageURL: detailProfile.profileInformation.imageURL || '',
                status: "DRAFT"
            });
        }
    }, [detailProfile]);

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setDataUpdate({ ...dataUpdate, title: newTitle });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setImage(file)
    };

    const convertFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await dispatch(uploadFile(formData))
        return response.payload
    }


    const handleUpdateDraftStepOne = async () => {
        if (dataUpdate.title) {
            if (image) {
                const url = await convertFileUpload(image);
                console.log("Co hinh khong", url)
                if (url) {
                    dataUpdate.imageURL = url
                    const response = await dispatch(updateProfileProductStepOneupdate({ dataUpdate: dataUpdate, id: id }))
                    console.log(dataUpdate)
                    if (response) {
                        toast.success('Lưu nháp thành công!', { autoClose: 200 });
                    } else {
                        toast.error('Đã có lỗi xảy ra!', { autoClose: 200 });
                    }
                }
            } else {
                const response = await dispatch(updateProfileProductStepOneupdate({ dataUpdate: dataUpdate, id: id }))
                if (response) {
                    toast.success('Lưu thành công!', { autoClose: 200 });

                } else {
                    toast.error('Đã có lỗi xảy ra!', { autoClose: 200 });
                }
            }
        }
    };

    const handleUpdatePendingStepOne = async () => {
        console.log("???")
        if (dataUpdate.title) {
            if (image) {
                const url = await convertFileUpload(image);
                if (url) {
                    dataUpdate.imageURL = url
                    dataUpdate.status = "PENDING TO PROCEED"
                    const response = await dispatch(updateProfileProductStepOneupdate({ dataUpdate: dataUpdate, id: id }))
                    console.log(dataUpdate)
                    if (response) {
                        toast.success('Hoành thành bước một!', { autoClose: 200 });
                        setTimeout(() => {
                            onNext(id);
                        }, 1000);
                    } else {
                        toast.error('Đã có lỗi xảy ra!', { autoClose: 200 });
                    }
                }
            } else {
                dataUpdate.status = "PENDING TO PROCEED"
                const response = await dispatch(updateProfileProductStepOneupdate({ dataUpdate: dataUpdate, id: id }))
                console.log(dataUpdate)
                if (response) {
                    toast.success('Hoành thành bước một!', { autoClose: 200 });
                    setTimeout(() => {
                        onNext(id);
                    }, 1000);
                } else {
                    toast.error('Đã có lỗi xảy ra!', { autoClose: 200 });
                }
            }
        }
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
                <input onChange={handleImageChange} type="file" accept="image/*" class="hidden" id="image-upload" />
                <label for="image-upload" className="cursor-pointer mb-2 block mx-auto">
                    <img
                        src={image ? URL.createObjectURL(image) : (dataUpdate.imageURL ? dataUpdate.imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiaH4XnlaUWReFVAIftt0qvvd_Y_ieJWREjOCVsPUTxYW5-DI_8oGctr8rvffv4zdxSyE&usqp=CAU")}
                        alt="Upload Image"
                        className="object-cover mx-auto rounded-lg w-64 border border-gray-300 hover:border-blue-500"
                    />

                </label>
                <p class="text-sm text-gray-500 text-center">Click để tải lên hình ảnh</p>
            </div>
            <div className="w-2/3 mx-auto h-52 p-6 flex justify-center items-center">
                <div className='w-full flex flex-col'>
                    <input
                        type="text"
                        className="w-3/4 mx-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        placeholder="Nhập tên hồ sơ sản phẩm"
                        value={dataUpdate.title}
                        onChange={handleTitleChange} // Call handleTitleChange function on input change
                    />
                </div>
            </div>


            <div className='flex justify-end gap-4 mr-16 mb-6'>
                <button onClick={handleUpdateDraftStepOne} className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Save as draft
                </button>
                <button onClick={handleUpdatePendingStepOne} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Next
                </button>
            </div>
        </div>
    )
}

export default UpdateStepOne;
