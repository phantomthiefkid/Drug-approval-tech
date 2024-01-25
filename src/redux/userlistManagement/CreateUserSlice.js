import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL_CREATE_USER = `https://fams-management.tech/auth/register`

export const createUser = createAsyncThunk("createUser", async (userData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue("No authentication token found");
        }
        const response = await axios.post(URL_CREATE_USER, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            return response.data;

        } else {
            return rejectWithValue("Request failed with status code " + response.status);
        }
    } catch (error) {
        return rejectWithValue("Request failed with an error: " + error.message);
    }
});

export const UserData = createSlice({
    name: 'userData',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        });

        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(createUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;

        });
    }
})
export default UserData.reducer;