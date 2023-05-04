import { configureStore } from "@reduxjs/toolkit";
import { announcementsReducer } from "./slices/announcements";

const store = configureStore({
    reducer: {
        announcements: announcementsReducer
    },
})

export default store;