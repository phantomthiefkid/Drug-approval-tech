import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_DRUGLIST = `https://fams-management.tech/admin/drug-management/drugs`

export const DrugsData = createAsyncThunk({
    name: 'drugData',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        totalPages: 0,
        drug: {}
    },
    extraReducers: (builder) => { }
})

export default DrugsData.reducer;