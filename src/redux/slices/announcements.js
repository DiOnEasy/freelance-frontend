import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAnnouncements = createAsyncThunk('announcements/fetchAnnouncements', async()=>{
    const {data} = await axios.get('/announcements');
    return data;
})

export const fetchRemoveAnnounce = createAsyncThunk('announce/fetchRemoveAnnounce', async(id) =>
axios.delete(`/announce/${id}`),
);

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
        // get announcements

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

        // remove announce

        [fetchRemoveAnnounce.pending]: (state, action) =>{
            state.announcements.items = state.announcements.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const announcementsReducer = announcementsSlice.reducer;