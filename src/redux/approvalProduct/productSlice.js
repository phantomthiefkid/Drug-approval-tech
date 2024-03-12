import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_COUNTRIES = `https://fams-management.tech/public/countries`
const URL_CATEGORIES = `https://fams-management.tech/public/categories`
const URL_CREATE_PRODUCT = `https://fams-management.tech/admin/approval-products`
const URL_UPDATE_PRODUCT = `https://fams-management.tech/admin/approval-products`

export const fetchCountries = createAsyncThunk('fetchCountries', async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Missing token');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await axios.get(URL_COUNTRIES, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}, [])

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
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

    };
    const response = await axios.get(URL_CATEGORIES, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}, [])

export const createProducts = createAsyncThunk('createProducts', async (ProductData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await axios.post(URL_CREATE_PRODUCT, ProductData, config);
    return response.data
  } catch (error) {
    throw error;
  }
}, [])

export const updateProducts = createAsyncThunk('updateProducts', async (ProductData, { rejectWithValue }) => {
  console.log("===>", ProductData)
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        id: ProductData.id
      }
    };
    const response = await axios.put(URL_UPDATE_PRODUCT, ProductData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}, [])

export const ProductsData = createSlice({
  name: "productData",
  initialState: {
    isLoading: false,
    data: [],
    countries: [],
    categories: [],
    isError: false,
    totalPages: 0,
    product: {}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.countries = action.payload;
    })
      .addCase(fetchCountries.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
      })

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.categories = action.payload;
    })
      .addCase(fetchCategories.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })

    builder.addCase(createProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.product = action.payload
    })
      .addCase(createProducts.rejected, (state) => {
        state.isError = true;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
  }
})

export default ProductsData.reducer;