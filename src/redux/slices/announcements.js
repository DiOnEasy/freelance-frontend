import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAnnouncements = createAsyncThunk('posts/fetchPosts', async()=>{
    const {data} = await axios.get('/announcements');
    return data;
})

const initialState = {
    announcements: {
        items: [],
        status: 'loading',
    },
};

const announcementsSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAnnouncements.pending]: (state) =>{
            state.announcements.items = [];
            state.announcements.status = 'loading';
        },
        [fetchAnnouncements.fulfilled]: (state, action) =>{
            state.announcements.items = action.payload;
            state.announcements.status = 'loaded';
        },
        [fetchAnnouncements.rejected]: (state) =>{
            state.announcements.items = [];
            state.announcements.status = 'error';
        },
    }
})

export const announcementsReducer = announcementsSlice.reducer;