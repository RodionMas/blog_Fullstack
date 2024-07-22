import { RootState } from "../store/store";

export const selectAuth = (state: RootState) => state.authReducer;

export const selectPosts = (state: RootState) => state.postsReducer;