import { configureStore } from '@reduxjs/toolkit'
import  authReducer from './AuthSlice'
import postsReducer from './PostsSlice'

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch