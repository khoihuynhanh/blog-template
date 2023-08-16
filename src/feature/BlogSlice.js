import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialPostList } from '../constants/data'
import http from '../utils/http'

const initialState = {
    postList: initialPostList,
    editingPost: null,
    loading: false,
    currentRequestId: undefined
}

export const getPostList = createAsyncThunk(
    'blog/getPostList',
    async (_, thunkAPI) => {
        const response = await http.get('posts', {
            signal: thunkAPI.signal
        })
        return response.data
    }
)

export const addPost = createAsyncThunk(
    'blog/addPost',
    async (body, thunkAPI) => {
        try {
            const response = await http.post('posts', body, {
                signal: thunkAPI.signal
            })
            return response.data
        } catch (error) {
            if (error.name === 'AxiosError' && error.response.status === 422) {
                return thunkAPI.rejectWithValue(error.response.data)
            }
            throw error
        }

    }
)

export const updatePost = createAsyncThunk(
    'blog/updatePost',
    async ({ postId, body }, thunkAPI) => {
        try {
            const response = await http.put(`posts/${postId}`, body, {
                signal: thunkAPI.signal
            })
            return response.data
        } catch (error) {
            if (error.name === 'AxiosError' && error.response.status === 422) {
                return thunkAPI.rejectWithValue(error.response.data)
            }
            throw error
        }
    }
)

export const deletePost = createAsyncThunk(
    'blog/deletePost',
    async (postId, thunkAPI) => {
        const response = await http.delete(`posts/${postId}`, {
            signal: thunkAPI.signal
        })
        return response.data
    }
)

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        startEditingPost: (state, action) => {
            const postId = action.payload
            const foundPost = state.postList.find(post => post.id === postId) || null
            state.editingPost = foundPost
        },
        cancelEditingPost: (state, action) => {
            state.editingPost = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPostList.fulfilled, (state, action) => {
                state.postList = action.payload
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.postList.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.postList.find((post, index) => {
                    if (post.id === action.payload.id) {
                        state.postList[index] = action.payload
                        return true
                    }
                    return false
                })
                state.editingPost = null
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const postId = action.payload
                const deletePostIndex = state.postList.find(post => post.id === postId)
                if (deletePostIndex !== -1) {
                    state.postList.splice(deletePostIndex, 1)
                }
            })
            .addMatcher(
                action => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = true
                    state.currentRequestId = action.meta.requestId
                }
            )
            .addMatcher(
                action => (action.type.endsWith('/rejected') || action.type.endsWith('fulfilled')),
                (state, action) => {
                    if (state.loading && state.currentRequestId === action.meta.requestId) {
                        state.loading = false
                        state.currentRequestId = undefined
                    }
                }
            )
    }
})

export const { startEditingPost, cancelEditingPost } = blogSlice.actions

export default blogSlice.reducer