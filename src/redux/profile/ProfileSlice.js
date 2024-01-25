import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PROFILE_VIEW = `https://fams-management.tech/user/find-by-email?email=`

export const viewProfile = createAsyncThunk('data/viewProfile', async (email, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Missing token');
        }
        const response = await axios.get(`${URL_PROFILE_VIEW}${email}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Profile data:', response.data);
        return response.data.token
    } catch (error) {
        console.log('Error in viewProfile:', error);
        return rejectWithValue(error);
    }
})

export const ProfileSlice = createSlice({
    name: 'viewProfile',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(viewProfile.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(viewProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.error('Error in fetchDataProfile', action.error)
            })
            .addCase(viewProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isError = false;
            })
    }
})

export default ProfileSlice.reducer;