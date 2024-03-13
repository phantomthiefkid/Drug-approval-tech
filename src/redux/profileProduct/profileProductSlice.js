import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_ONE = "https://fams-management.tech/admin/profile-products/step-one"
const URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_TWO = "https://fams-management.tech/admin/profile-products/step-two"
export const createProfileProductStepOne = createAsyncThunk('createProfileProductStepOne', async (stepOne) => {
    try {

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Missing Token');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post(URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_ONE, stepOne, config)
        return response.data
    } catch (error) {
        throw error
    }
})

export const createProfileProductStepTwo = createAsyncThunk('createProfileProductStepTwo', async (stepTwo) => {
    try {

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Missing Token');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post(URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_TWO, stepTwo, config)
        return response.data
    } catch (error) {
        throw error
    }
})

export const ProfileProduct = createSlice({
    name: 'profileProduct',
    initialState: {
        data: {},
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(createProfileProductStepOne.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
            .addCase(createProfileProductStepOne.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createProfileProductStepOne.rejected, (state, action) => {
                state.isError = true
            })
            .addCase(createProfileProductStepTwo.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(createProfileProductStepTwo.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createProfileProductStepTwo.rejected, (state, action) => {
                state.isError = true
            })
    }
})

export default ProfileProduct.reducer