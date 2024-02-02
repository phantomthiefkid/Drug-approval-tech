import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_DRUGLIST = `https://fams-management.tech/admin/drug-management/drugs`
const URL_CREATE_DRUG = `https://fams-management.tech/admin/drug-management/drug/create`
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