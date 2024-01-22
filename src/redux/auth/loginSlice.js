import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = 'https://fams-management.tech/auth/login'

export const loginAccount = createAsyncThunk('login', async ({email, password}) => {
    try {
        const response = await axios.post(URL, {
            email, password
        });
        const token = response.data
        localStorage.setItem('token', token)
        return token;
    } catch (error) {
        throw error;
    }
}, []);

export const loginAPI = createSlice({
    name: 'loginAPI',
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.isError = false
        })
        builder.addCase(loginAccount.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(loginAccount.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default loginAPI.reducer;