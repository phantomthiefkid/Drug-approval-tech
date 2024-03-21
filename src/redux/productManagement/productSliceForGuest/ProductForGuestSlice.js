import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LIST_PRODUCT_DETAIL = 'https://fams-management.tech/public/approval-products/';

export const fetchProductDetailGuest = createAsyncThunk('fetchProductDetailGuest', async ({id}) => {
    try {
        const config = {   
            params: {
                id
            }
        }
        const response = await axios.get(URL_LIST_PRODUCT_DETAIL+id, config);
        console.log("===> " ,response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const ProductDataGuest = createSlice({
    name: 'productDataGuest',
    initialState: {
        isLoading: false,
        isError: false,
        detail: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetailGuest.fulfilled, (state, action) => {
                state.detail = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProductDetailGuest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetailGuest.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default ProductDataGuest.reducer;
