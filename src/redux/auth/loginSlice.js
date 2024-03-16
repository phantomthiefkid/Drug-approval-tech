import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LOGIN = `https://fams-management.tech/auth/login`
const URL_PASSWORD_CHANGE = `https://fams-management.tech/auth/users`

export const loginApi = (email, password) => {
  return axios.post(URL_LOGIN, {
    email: email,
    password: password,
  });
};

export const passwordChange = createAsyncThunk(
  'auth/passwordChange',
  async ({ email, currentPassword, newPassword }, { rejectWithValue }) => {
    console.log('email', email)
    console.log('currentPassword', currentPassword)
    console.log('newPassword', newPassword)

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Missing token');
      }
      const response = await axios.post(
        URL_PASSWORD_CHANGE,
        { email, currentPassword, newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          params: {
            email
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error in passwordChange', error);
      return rejectWithValue(error);
    }
  }
);




export const getUserDataFromToken = () => {
  const token = localStorage.getItem('token');
  try {
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const data = JSON.parse(decodedPayload);
      if (data && data.RoleName) {
        return data.RoleName;
      }
    }
  } catch (error) {
    console.error('Error decoding or parsing token:', error.message);
  }
  return null;
};

export const getUserNameFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const data = JSON.parse(atob(token.split('.')[1]));
    return data;
  }
  return null;
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(passwordChange.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload
    })
      .addCase(passwordChange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordChange.rejected, (state) => {
        state.isError = true;
      })
  }
})

export default LoginSlice.reducer