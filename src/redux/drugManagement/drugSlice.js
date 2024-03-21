import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_DRUGLIST = `https://fams-management.tech/admin/drugs`
const URL_CREATE_DRUG = `https://fams-management.tech/admin/drugs`
const URL_UPDATE_DRUG = `https://fams-management.tech/admin/drugs`
const URL_DEACTIVE_DRUG = `https://fams-management.tech/admin/drugs`
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
    throw error;
  }
}, [])

export const createDrugs = createAsyncThunk('drugs/createDrug', async (DrugData, { rejectWithValue }) => {

  try {
    console.log("Drug Data: " ,DrugData)
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await axios.post(URL_CREATE_DRUG, DrugData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}, [])

export const updateDrugs = createAsyncThunk('drugs/updateDrug', async (DrugData, { rejectWithValue }) => {
  console.log("here: ", DrugData)
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await axios.put(URL_UPDATE_DRUG + `?drugId=${DrugData.id}`, DrugData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}, [])

export const deactivateDrugs = createAsyncThunk('drugs/deactivateDrugs', async (drugId, { rejectWithValue }) => {

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await axios.delete(URL_DEACTIVE_DRUG + `?id=${drugId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}, [])

export const DrugsData = createSlice({
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
    builder.addCase(createDrugs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.drug = action.payload
    })
      .addCase(createDrugs.rejected, (state) => {
        state.isError = true;
      })
      .addCase(createDrugs.pending, (state) => {
        state.isLoading = true;
      })
  }
})

export default DrugsData.reducer;