import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_DRUGLIST = `https://fams-management.tech/admin/drug-management/drugs`
const URL_CREATE_DRUG = `https://fams-management.tech/admin/drug-management/drug/create`

export const fetchDrugs = createAsyncThunk('fetchDrugs', async ({ pageNo, pageSize, sortField, sortOrder, search }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Missing token');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                pageNo,
                pageSize,
                sortField,
                sortOrder,
                search
            }
        };
        const response = await axios.get(URL_DRUGLIST, config);
        return response.data;
    } catch (error) {
        console.log("Error in try catch: ", error)
        throw error;
    }
}, [])

export const DrugsData = createAsyncThunk({
    name: 'drugData',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        totalPages: 0,
        drug: {}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDrugs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
            state.totalPages = action.payload.totalPages
        })
            .addCase(fetchDrugs.rejected, (state) => {
                state.isError = true;
            })
            .addCase(fetchDrugs.pending, (state) => {
                state.isLoading = true;
            })
    }
})

export default DrugsData.reducer;