import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_ONE = "https://fams-management.tech/admin/profile-products/step-one"
const URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_TWO = "https://fams-management.tech/admin/profile-products/step-two"

const URL_PROFILE_PRODUCT_LIST = `https://fams-management.tech/admin/profile-products`
const URL_PROFILE_PRODUCT_DETAIL = `https://fams-management.tech/admin/profile-products-details`

const URL_ADMIN_PRODUCTS = `https://fams-management.tech/admin/products`

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

export const fetchProfileProducts = createAsyncThunk('fetchProfileProducts', async ({ pageNo, pageSize, search }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Missing token");
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        pageNo,
        pageSize,
        search
      }
    };
    const response = await axios.get(URL_PROFILE_PRODUCT_LIST, config);
    return response.data.content;
  } catch (error) {
    throw error;
  }
})

export const fetchProfileProductsDetail = createAsyncThunk('fetchProfileProductsDetail', async ({ id }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Missing token");
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        id
      }
    };
    const response = await axios.get(URL_PROFILE_PRODUCT_DETAIL, config);
    return response.data;
  } catch (error) {
    throw error;
  }
})

export const fetchProductsWithAdmin = createAsyncThunk('fetchProductsWithAdmin', async ({ id }) => {
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
    };
    const response = await axios.get(URL_ADMIN_PRODUCTS, config);
    return response.data
  } catch (error) {
    throw error;
  }
})

export const ProfileProduct = createSlice({
  name: 'profileProduct',
  initialState: {
    dataCreate: {},
    isLoading: false,
    isError: false,
    data: [],
    totalPages: 0,
    profile: {},
    detail: {},
    product: {}
  },
  extraReducers: (builder) => {
    builder.addCase(createProfileProductStepOne.fulfilled, (state, action) => {
      state.dataCreate = action.payload;
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
        state.dataCreate = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createProfileProductStepTwo.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createProfileProductStepTwo.rejected, (state, action) => {
        state.isError = true
      })
      .addCase(fetchProfileProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        console.log(action.payload.totalPages)
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchProfileProducts.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchProfileProducts.pending, (state) => {
        state.isLoading = true;
      })

    builder.addCase(fetchProfileProductsDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.detail = action.payload
    })
      .addCase(fetchProfileProductsDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileProductsDetail.rejected, (state) => {
        state.isError = true;
      })

    builder.addCase(fetchProductsWithAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.product = action.payload
    })
      .addCase(fetchProductsWithAdmin.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchProductsWithAdmin.pending, (state) => {
        state.isLoading = true;
      })
  }
})

export default ProfileProduct.reducer
