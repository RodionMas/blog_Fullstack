import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createPostData,
  CreatePostType,
  GetMe,
  LoginResponse,
  loginSliceState,
  registerUser,
  RegisterUserResponse,
  SuccessType,
  UpdatePost,
  user,
} from "../types/types";
import axios from "../instanceAxios";
import { storageUser } from "../StorageUser";

export const fetchLogin = createAsyncThunk<LoginResponse, user, { rejectValue: string }>(
  "login/fetchLogin",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`/auth/login/`, value)
        .then((res) => res);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegister = createAsyncThunk<
  RegisterUserResponse,
  registerUser,
  { rejectValue: string }
>(
  "posts/fetchRegister",
  async (register: registerUser, { rejectWithValue }) => {
    try {
      const response = await axios
        .post("/auth/register", register)
        .then((res) => res);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGetMe = createAsyncThunk<
  GetMe,
  undefined,
  { rejectValue: string }
>("posts/fetchGetMe", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/auth/me`).then((res) => res);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRemovePost = createAsyncThunk<
  SuccessType,
  string,
  { rejectValue: string }
>("posts/fetchRemovePost", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/posts/${id}`).then((res) => res);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchCreate = createAsyncThunk<
  CreatePostType,
  createPostData,
  { rejectValue: string }
>("posts/fetchCreate", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/posts`, data).then((res) => res);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchUpdate = createAsyncThunk<
  SuccessType,
  UpdatePost,
  { rejectValue: string }
>("posts/fetchUpdate", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/posts/${id}`, data).then((res) => res);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: loginSliceState = {
  user: storageUser(),
  loading: "idle",
  err: null,
  isAuth: false,
};

export const authReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    authChange: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    removeUserReducer: (state) => {
      state.user = {
        email: "",
        password: "",
        fullName: "",
        token: "",
        _id: "",
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
      if (state.user) {
        state.isAuth = true;
      }
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
      if (state.user) {
        state.isAuth = true;
      }
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload) {
        state.err = "error";
      }
    });
    builder.addCase(fetchGetMe.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchGetMe.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
    });
    builder.addCase(fetchGetMe.rejected, (state, action) => {
      state.loading = "failed";
      console.log(action.payload);
      if (action.payload) {
        state.err = "error";
      }
    });
    builder.addCase(fetchRemovePost.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
    });
    builder.addCase(fetchRemovePost.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(fetchCreate.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchCreate.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchCreate.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(fetchUpdate.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchUpdate.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
    });
    builder.addCase(fetchUpdate.rejected, (state) => {
      state.loading = "failed";
    });
  },
});
// Action creators are generated for each case reducer function
export const { authChange, removeUserReducer } = authReducer.actions;

export default authReducer.reducer;
