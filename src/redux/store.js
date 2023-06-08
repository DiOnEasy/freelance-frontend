import { configureStore } from "@reduxjs/toolkit";
import { announcementsReducer } from "./slices/announcements";
import { authReducer } from "./slices/auth";
import { ordersReducer } from "./slices/orders";

const store = configureStore({
    reducer: {
        announcements: announcementsReducer,
        auth: authReducer,
        orders: ordersReducer,
    },
})

export default store;