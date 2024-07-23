import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginSliceState, registerUser, user } from "../types/types";
import axios from "../instanceAxios";
import { storageUser } from "../StorageUser";

type valueType = {
  email: string;
  password: string;
};

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (value: valueType, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`/auth/login/`, value)
        .then((res) => res);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
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

export const fetchGetMe = createAsyncThunk(
  "posts/fetchGetMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/auth/me`).then((res) => res);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/posts/${id}`).then((res) => res);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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
        token: '',
      };
    }
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
      console.log(action.payload);

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
  },
});

// Action creators are generated for each case reducer function
export const { authChange, removeUserReducer } = authReducer.actions;

export default authReducer.reducer;
