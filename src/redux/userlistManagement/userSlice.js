import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERSLIST_URL = "https://fams-management.tech/admin/users";
const UPDATE_USER_URL = "https://fams-management.tech/admin/users";
const FIND_USER_BY_EMAIL_URL = "https://fams-management.tech/admin/users/email";
const ACTIVE_USER_URL = "https://fams-management.tech/admin/users/activate";
const DEACTIVATE_USER_URL = "https://fams-management.tech/admin/users/deactivate";
const URL_CREATE_USER = "https://fams-management.tech/auth/register";
const URL_IMAGE = "https://fams-management.tech/api/storage/uploadFile"

export const fetchUsers = createAsyncThunk('fetchUsers', async ({ pageSize, pageNo, sortField, sortOrder, roleName, status, gender, search }) => {
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
        pageNo,
        sortField,
        sortOrder,
        roleName,
        status,
        gender,
        search
      }
    };
    const response = await axios.get(USERSLIST_URL, config);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("here")
    throw error;
  }
}, []);

export const findUserByEmail = createAsyncThunk('findUserByEmail', async (email) => {
  try {
    console.log(email)
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

    const response = await axios.get(FIND_USER_BY_EMAIL_URL + `?email=${email}`, config);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Loi')
    throw error;
  }
}, []);

export const updateUsers = createAsyncThunk('updateUsers', async (userUpdate) => {
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

    const response = await axios.put(UPDATE_USER_URL + `?email=${userUpdate.email}`, {
      fullName: userUpdate.fullname,
      dayOfBirth: userUpdate.dayOfBirth,
      gender: userUpdate.gender
    }, config);

    return response.data;
  } catch (error) {
    throw error;
  }
}, []);

export const deactivateUser = createAsyncThunk('deactivateUser', async ({ email }) => {
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

    const response = await axios.post(DEACTIVATE_USER_URL + `?email=${email}`, null, config);

    return response.data;
  } catch (error) {
    throw error;
  }
}, []);

export const activeUser = createAsyncThunk('activeUser', async ({ email }) => {
  try {
    console.log(email)
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

    const response = await axios.post(ACTIVE_USER_URL + `?email=${email}`, null, config);

    return response.data;
  } catch (error) {
    throw error;
  }
}, []);

export const createUser = createAsyncThunk('createUser', async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No authentication token found');
      return rejectWithValue('No authentication token found');
    }

    console.log('Attempting to create user with token:', token);

    const response = await axios.post(URL_CREATE_USER, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Response:', response);

    if (response.status === 200) {
      console.log('User created successfully');
      return response.data;
    } else {
      console.error('Request failed with status code', response.status);
      return rejectWithValue('Request failed with status code ' + response.status);
    }
  } catch (error) {
    console.error('Request failed with an error:', error.message);
    return rejectWithValue('Request failed with an error: ' + error.message);
  }
});


export const uploadFile = createAsyncThunk("uploadFile", async (importImage, { rejectWithValue }) => {
  // console.log("reduxxxx", importImage)
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      return rejectWithValue('Missing token');
    }
    const formData = new FormData()
    formData.append('file', importImage.file);

    console.log("->>>>>>>>>", importImage.file)
    const urlWithParams = `${URL_IMAGE}`

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

export const UsersData = createSlice({
  name: 'userData',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    totalPages: 0,
    user: {}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false
      state.totalPages = action.payload.totalPages
    })
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isError = true;
    })
    builder.addCase(findUserByEmail.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(findUserByEmail.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(findUserByEmail.rejected, (state, action) => {
      state.isError = true;
    })
    builder.addCase(deactivateUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(deactivateUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(deactivateUser.rejected, (state, action) => {
      state.isError = true;
    })
    builder.addCase(activeUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(activeUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(activeUser.rejected, (state, action) => {
      state.isError = true;
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;

    });
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
})

export default UsersData.reducer;