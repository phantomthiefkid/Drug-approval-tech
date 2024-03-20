import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_UPLOAD = "https://fams-management.tech/api/storage/uploadFile"

export const uploadFile = createAsyncThunk('uploadFile', async (file) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Custom-Header': 'value',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post(URL_UPLOAD, file, config)
        console.log("Redux: ", response.data)
        return response.data
    } catch (error) {
        throw (error)
    }
})

export const UploadData = createSlice({
    name: 'UploadData',
    initialState: {
        isLoading: false,
        data: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload
        })
            .addCase(uploadFile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadFile.rejected, (state) => {
                state.isError = true;
            })
    }
})

export default UploadData.reducer