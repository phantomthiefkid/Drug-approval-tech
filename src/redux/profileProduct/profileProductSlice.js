import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PROFILE_PRODUCT_LIST = `https://fams-management.tech/admin/profile-products`
const URL_PROFILE_PRODUCT_DETAIL = `https://fams-management.tech/admin/profile-products-details`

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
    return response.data;
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

export const ProfileProductsData = createSlice({
  name: 'profileProduct',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    totalPages: 0,
    profile: {},
    detail: {}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
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
  }
})
export default ProfileProductsData.reducer