import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LIST_PRODUCTS = 'https://fams-management.tech/admin/approval-products'
const URL_PRODUCT_DETAIL = 'https://fams-management.tech/admin/approval-products-detail'

const URL_PRODUCT_APPROVAL_FDA = 'https://fams-management.tech/public/approval-products/FDA'
const URL_PRODUCT_APPROVAL_ANSM = 'https://fams-management.tech/public/approval-products/ANSM'
const URL_PRODUCT_APPROVAL_DAV = 'https://fams-management.tech/public/approval-products/DAV'

const URL_ADMIN_PRODUCT_APPROVAL_FDA = 'https://fams-management.tech/admin/approval-products/FDA'
const URL_ADMIN_PRODUCT_APPROVAL_ANSM = 'https://fams-management.tech/admin/approval-products/ANSM'
const URL_ADMIN_PRODUCT_APPROVAL_DAV = 'https://fams-management.tech/admin/approval-products/DAV'

const URL_UPLOAD_FILE_APPROVAL_PRODUCT = 'https://fams-management.tech/api/storage/approval-products'

export const uploadFileProduct = createAsyncThunk('upload', async ({ file, ApprovalProductID }) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Custom-Header': 'value',
                'Authorization': `Bearer ${token}`
            },
            params: {
                ApprovalProductID
            }
        }
        const response = await axios.post(URL_UPLOAD_FILE_APPROVAL_PRODUCT, file, config)
        console.log(response.data)
        return response.data
    } catch (error) {

    }
})

export const fetchProducts = createAsyncThunk('fetchProducts', async ({ pageSize, sortField, sortOrder, pageNo, search, id }) => {
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
        if (id === "FDA") {
            const response = await axios.get(URL_ADMIN_PRODUCT_APPROVAL_FDA, config)
            return response.data
        }
        if (id === "ANSM") {
            const response = await axios.get(URL_ADMIN_PRODUCT_APPROVAL_ANSM, config)
            return response.data
        }
        if (id === "DAV") {
            const response = await axios.get(URL_ADMIN_PRODUCT_APPROVAL_DAV, config)
            return response.data
        }
    } catch (error) {
        throw error;
    }
})

export const fetchProductsFollowOrganization = createAsyncThunk('fetchProductsFollowOrganization', async ({ pageSize, sortField, sortOrder, pageNo, search, id }) => {
    try {
        console.log("Check: ", pageSize, sortField, sortOrder, pageNo, id)
        const config = {
            params: {
                pageSize,
                sortField,
                sortOrder,
                pageNo,
                search
            }
        }
        if (id === "FDA") {
            const response = await axios.get(URL_PRODUCT_APPROVAL_FDA, config)
            return response.data
        }
        if (id === "ANSM") {
            const response = await axios.get(URL_PRODUCT_APPROVAL_ANSM, config)
            return response.data
        }
        if (id === "DAV") {
            const response = await axios.get(URL_PRODUCT_APPROVAL_DAV, config)
            return response.data
        }
    } catch (error) {
        throw (error)
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
        detail: {},
        dataGuest: []
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
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
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
            .addCase(fetchProductsFollowOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.dataGuest = action.payload.content
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchProductsFollowOrganization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductsFollowOrganization.rejected, (state) => {
                state.isError = true;
            })
            .addCase(uploadFileProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.dataGuest = action.payload
            })
            .addCase(uploadFileProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadFileProduct.rejected, (state) => {
                state.isError = true;
            })
    }
})

export default ProductData.reducer
