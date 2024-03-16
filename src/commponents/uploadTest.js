import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../redux/uploadFile/uploadFile';

const UploadTest = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const convertFileUpload = async (file) => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                console.log("FormData:", formData);
                const response = await dispatch(uploadFile(formData));
                console.log("Response:", response.payload);
                // Xử lý response ở đây (hiển thị thông báo, xử lý lỗi, vv.)
                return response;
            } else {
                console.log("No file selected.");
            }
        } catch (error) {
            console.error("Error:", error);
            throw error; // Rethrow error for handling at higher level
        }
    };

    return (
        <div className='mt-20'>
            <h1>Upload</h1>
            <input onChange={handleFileChange} type='file'></input>
            <button onClick={() => convertFileUpload(selectedFile)}>Click here</button>
        </div>
    );
};

export default UploadTest;
