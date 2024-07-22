import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { postsSliceState } from "../types/types";
import axios from "../instanceAxios";
import { useDispatch } from "react-redux";
import { store } from "./store";

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/posts").then((res) => res);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTags = createAsyncThunk(
  "posts/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/posts/tags").then((res) => res);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: postsSliceState = {
  tags: [],
  posts: [
    {
      createdAt: "",
      imageUrl: "",
      tags: [],
      text: "",
      title: "",
      viewsCount: 0,
      user: {
        _id: "",
        fullName: "",
        email: "",
        updatedAt: "",
        avatarUrl: "",
      },
      _id: "",
    },
  ],
  err: null,
  loading: "idle",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.posts = action.payload.reverse();
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.loading = "succeeded";
      action.payload.map((tags: string) => state.tags.push(tags));
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
