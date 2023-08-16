import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './feature/BlogSlice'

export const store = configureStore({
    reducer: {
        blogSlice: blogSlice
    }
})