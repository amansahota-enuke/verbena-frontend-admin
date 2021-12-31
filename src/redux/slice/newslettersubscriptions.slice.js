import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import statusConstants from "../../constants/status.constants";
import { NewsletterSubscriptionsService } from "../../services";

const fetchNewsletterSubscribers = createAsyncThunk(
    "home/fetchNewsletterSubscribers",
    async (payload, thunkApi) => {
        try {
            const response = await NewsletterSubscriptionsService.getNewsletterSubscribers(payload);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const NewsletterSubscriptionActions = {
    fetchNewsletterSubscribers
};

const NewsletterSubscriptionSlice = createSlice({
    name: "newslettersubscribers",
    initialState: {
        status: null,
        count: 0,
        subscribersList: [],
    },
    extraReducers: {
        [fetchNewsletterSubscribers.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchNewsletterSubscribers.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.count = action.payload.count;
            state.subscribersList = action.payload.rows;
        },
        [fetchNewsletterSubscribers.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
    },
});

export default NewsletterSubscriptionSlice.reducer;
