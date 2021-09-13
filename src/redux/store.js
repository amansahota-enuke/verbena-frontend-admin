import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";

const store = configureStore({
    reducer: {
        user: UserReducer,
    },
});

export default store;
