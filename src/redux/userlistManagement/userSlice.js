import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://649e9aef245f077f3e9ca295.mockapi.io/users";

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
}, []);

export const updateUsers = createAsyncThunk('updateUsers', async (userUpdate) => {
    try {
        const response = await axios.put(USERS_URL + `/${userUpdate.id}`, userUpdate);
        if (response.status === 200) {
            return response.data;
        } else {
            return console.log("Request failed!!!")
        }
    } catch (error) {
        throw error;
    }
}, []);

export const UsersData = createSlice({
    name: 'userData',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.isError = false
        })
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isError = true;
        })
        builder.addCase(updateUsers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.isError = false
        })
        builder.addCase(updateUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(updateUsers.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default UsersData.reducer;