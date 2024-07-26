import { Dispatch, SetStateAction } from "react";

//login
export interface loginSliceState {
  user: {
    // [x: string]: string;
    _id: string;
    email: string;
    password: string;
    fullName: string;
    token: string;
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
  err: null | string;
  isAuth: boolean;
}
export type user = {
  email: string;
  password: string;
}; 
export interface LoginResponse {
  password: string
  _id: string;
  avatarUrl: string;
  email: string;
  fullName: string;
  token: string;
}
export interface registerSliceState {
  fullName: string;
  email: string;
  passwordHash: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  err: null | string;
}
export type registerUser = {
  email: string;
  password: string; // Добавьте это свойство
  fullName: string;
};
export type post = {
  createdAt: string;
  imageUrl: string;
  tags: string[];
  text: string;
  title: string;
  viewsCount: number;
  user: {
    _id: string;
    fullName: string;
    email: string;
    updatedAt: string;
    avatarUrl: string;
  };
  _id: string;
};
export interface postsSliceState {
  updateUser: any;
  tags: string[];
  posts: [post];
  err: null | string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  updatePost: {};
}
export type createPost = {
  updatedAt: string;
};

export interface ChildProps {
  wantDel: any;
  setDel: Dispatch<SetStateAction<boolean>>;
}
export type createPostData = {
  title: string;
  tags: string[];
  text: string;
  imageUrl?: string;
};
export interface GetMe {
  createdAt: string;
  email: string;
  fullName: string;
  updatedAt: string;
}
export interface CreatePostType {
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: string;
}

export type SuccessType = {
  success: boolean;
};
export interface UpdatePost {
  id: string | undefined;
  data: {
    title: string;
    tags: string[];
    text: string;
    imageUrl?: string;
  };
}

export interface RegisterUserResponse {
  createdAt: string;
  email: string;
  fullName: string;
  passwordHash: string;
  password: string;
  token: string;
  updatedAt: string;
  _id: string;
}
