import { configureStore } from "@reduxjs/toolkit";
import { announcementsReducer } from "./slices/announcements";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        announcements: announcementsReducer,
        auth: authReducer,
    },
})

export default store;