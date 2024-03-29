import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PROFILE_VIEW = `https://fams-management.tech/admin/users/email`
const URL_PROFILE_UPDATE = `https://fams-management.tech/admin/users`
const URL_IMAGE = `https://fams-management.tech/api/storage/user?email=`

export const viewProfile = createAsyncThunk('viewProfile', async (email, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Missing token');
    }
    const response = await axios.get(URL_PROFILE_VIEW + `?email=${email}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error in viewProfile:', error);
    return rejectWithValue(error);
  }
})

export const updateProfile = createAsyncThunk('updateProfile', async (profileUpdate, { rejectWithValue }) => {
  console.log(profileUpdate)
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      return rejectWithValue('No authentication token found')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await axios.put(URL_PROFILE_UPDATE + `?email=${profileUpdate.email}`, {

      fullName: profileUpdate.fullname,
      dayOfBirth: profileUpdate.dayOfBirth,
      gender: profileUpdate.gender
    }, config);
    console.log(response.data)

    if (response.status === 200) {
      console.log(response.data);
      return response.data
    } else {
      return rejectWithValue('Request failed with status code' + response.status)
    }
  } catch (error) {
    return rejectWithValue('Request failed with an error: ' + error.message)
  }
})

export const uploadImage = createAsyncThunk("uploadImage", async (importImage, { rejectWithValue }) => {
  console.log("reduxxxx", importImage)
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue("Missing token");
    }
    const formData = new FormData();
    formData.append('file', importImage.file);

    console.log("->>>>>>>>>", importImage.file)

    const urlWithParams = `${URL_IMAGE}${importImage.email}`

    const response = await axios.post(urlWithParams, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${token}`
      },
    })
    if (response.status === 200) {
      console.log("---->", response.data)
      return response.data;
    } else {
      return rejectWithValue('Request failed with status code ' + response.status);
    }

  } catch (error) {
    return rejectWithValue('Request failed with an error: ' + error.message);

  }
})

export const ProfileSlice = createSlice({
  name: 'viewProfile',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewProfile.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
      .addCase(viewProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error('Error in fetchDataProfile', action.error)
      })
      .addCase(viewProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
        // Update the initial state to match the expected structure
        state.initialState = { ...state.initialState, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload ? action.payload : 'Failed to update profile';
        console.error('Error updating profile:', action.error);
      });
    builder
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
})

export default ProfileSlice.reducer;