import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LIST_PRODUCTS = 'https://fams-management.tech/admin/approval-products'
const URL_PRODUCT_DETAIL = 'https://fams-management.tech/admin/approval-product-detail'
export const fetchProducts = createAsyncThunk('fetchProducts', async ({ pageSize, sortField, sortOrder, pageNo, search }) => {
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
                pageSize,
                sortField,
                sortOrder,
                pageNo,
                search
            }
        }
        const response = await axios.get(URL_LIST_PRODUCTS, config);

        return response.data;
    } catch (error) {
        throw error;
    }
})

export const fetchProductDetail = createAsyncThunk('fetchProductDetail', async ({ id }) => {
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
                id
            }
        }
        const response = await axios.get(URL_PRODUCT_DETAIL, config);
        console.log("Check:", response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
})

export const ProductData = createSlice({
    name: 'productData',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        totalPages: 0,
        detail: {}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload.content;
            state.totalPages = action.payload.totalPages

        })
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isError = true;
            })
        builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.detail = action.payload

        })
            .addCase(fetchProductDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetail.rejected, (state) => {
                state.isError = true;
            })
    }
})

export default ProductData.reducer