import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_ONE = "https://fams-management.tech/admin/profile-products/step-one"
const URL_ADMIN_CREATE_PROFILE_PRODUCT_STEP_TWO = "https://fams-management.tech/admin/profile-products/step-two"

const URL_PROFILE_PRODUCT_LIST = `https://fams-management.tech/admin/profile-products`
const URL_PROFILE_PRODUCT_DETAIL = `https://fams-management.tech/admin/profile-products-details`

const URL_ADMIN_UPDATE_PROFILE_PRODUCT_STEP_ONE = "https://fams-management.tech/admin/profile-products/step-one"
const URL_ADMIN_PRODUCTS = `https://fams-management.tech/admin/products`
const URL_PROCESS_PROFILE = `https://fams-management.tech/admin/profile-products/process`
const URL_SUBMISSION = `https://fams-management.tech/admin/profile-products/submission`

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
    console.log("Check step 2: ", stepTwo)
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

export const updateProfileProductStepOneupdate = createAsyncThunk('updateProfileProductStepOne', async (stepOne) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Missing Token');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        profileId: stepOne.id
      }
    }
    const response = await axios.put(URL_ADMIN_UPDATE_PROFILE_PRODUCT_STEP_ONE, stepOne, config)
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

export const processProfile = createAsyncThunk('processProfile', async ({ id }) => {
  console.log(id);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Missing token');
    }
    const params = new URLSearchParams();
    params.append('profileId', id);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    const response = await axios.post(`${URL_PROCESS_PROFILE}?${params.toString()}`, null, config);
    console.log(params.toString())
    return response.data;
  } catch (error) {
    throw error;
  }
});

// export const submissionStatus = createAsyncThunk('submissionStatus', async ({ profileId, data }) => {
//   console.log(data)
//   // console.log(status)
//   console.log(profileId)

//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Missing token');
//     }
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       params: {
//         profileId,
//         data
//       }
//     }
//     const response = await axios.post(URL_SUBMISSION, { data, profileId }, config)
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// })

// export const submissionStatus = createAsyncThunk('submissionStatus', async ({ profileId, data }) => {
//   console.log(profileId);
//   console.log(data);

//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Missing token');
//     }
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     };
//     const queryParams = new URLSearchParams();
//     queryParams.append('profileId', profileId);
//     data.forEach(({ profileDetailId, status }, index) => {
//       queryParams.append(`data[${index}][profileDetailId]`, profileDetailId);
//       queryParams.append(`data[${index}][status]`, status);
//     });
//     const response = await axios.post(`${URL_SUBMISSION}?${queryParams.toString()}`, {}, config);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });

export const submissionStatus = createAsyncThunk('submissionStatus', async ({ profileId, data }) => {
  console.log(profileId);
  console.log(data);

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
    const queryParams = new URLSearchParams();
    queryParams.append('profileId', profileId);
    const response = await axios.post(`${URL_SUBMISSION}?${queryParams.toString()}`, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
});

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
    process: {},
    submission: {}
  },
  extraReducers: (builder) => {
    builder.addCase(createProfileProductStepOne.fulfilled, (state, action) => {
      state.dataCreate = action.payload;
      console.log("Redux: ", action.payload)
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
    builder.addCase(updateProfileProductStepOneupdate.fulfilled, (state, action) => {
      state.dataCreate = action.payload;

      state.isLoading = false;
      state.isError = false;
    })
      .addCase(updateProfileProductStepOneupdate.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateProfileProductStepOneupdate.rejected, (state, action) => {
        state.isError = true
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

    builder.addCase(processProfile.fulfilled, (state, action) => {
      state.process = action.payload;
      state.isLoading = false;
      state.isError = false;
    })
      .addCase(processProfile.rejected, (state) => {
        state.isError = true;
      })
      .addCase(processProfile.pending, (state) => {
        state.isLoading = true;
      })

    builder.addCase(submissionStatus.fulfilled, (state, action) => {
      state.submission = action.payload;
      state.isLoading = false;
      state.isError = false;
    })
      .addCase(submissionStatus.rejected, (state) => {
        state.isError = true;
      })
      .addCase(submissionStatus.pending, (state) => {
        state.isLoading = true;
      })
  }

})

export default ProfileProduct.reducer
