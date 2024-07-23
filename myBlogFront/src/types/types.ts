//login
export interface loginSliceState {
  user: {
    [x: string]: string;
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
//register
export interface registerSliceState {
  fullName: string;
  email: string;
  passwordHash: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  err: null | string;
}
export type registerUser = {
  fullName: string;
  email: string;
  password: string;
};
//posts
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
  tags: string[];
  posts: [post];
  err: null | string;
  loading: "idle" | "pending" | "succeeded" | "failed";
}
export type createPost = {
  updatedAt: string;
};
