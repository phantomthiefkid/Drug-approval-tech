import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const URL_API_ADMIN = "https://fams-management.tech/api/admin"
const URL_SEND_MAIL = "https://fams-management.tech/mail/Optional"

export const getEmailAdmin = createAsyncThunk('getAdmin', async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Missing token');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.get(URL_API_ADMIN, config)
        
        return response.data
    } catch (error) {
        throw error
    }
})

export const sendMailAdmin = createAsyncThunk('sendMailAdmin', async (dataSend) => {
    try {
        const token = localStorage.getItem('token');
        console.log("check: ", dataSend.email)
        if (!token) {
            throw new Error('Missing token');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: { to: dataSend.email }, // Truyền email dưới dạng tham số trong URL
        };

        const body = { content: dataSend.content, tesText: dataSend.tesText }; // Body của yêu cầu

        const response = await axios.post(URL_SEND_MAIL, body, config); // Gửi yêu cầu POST với body và config

        return response.data; // Trả về dữ liệu từ response
    } catch (error) {
        throw error; // Xử lý lỗi nếu có
    }
});



export const apiEmailAdmin = createSlice({
    name: 'apiEmailAdmin',
    initialState: {
        isLoading: false,
        isError: false,
        data: [],
        dataResponse: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getEmailAdmin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(getEmailAdmin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getEmailAdmin.rejected, (state, action) => {
                state.isError = true
            })
            .addCase(sendMailAdmin.fulfilled, (state, action) => {
                state.dataResponse = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(sendMailAdmin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(sendMailAdmin.rejected, (state, action) => {
                state.isError = true
            })
    }
})

export default apiEmailAdmin.reducer
