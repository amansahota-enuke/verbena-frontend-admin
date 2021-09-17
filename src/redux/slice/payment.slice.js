import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import statusConstants from "../../constants/status.constants";
import { PaymentService } from "../../services";

const fetchPaymentList = createAsyncThunk(
    "payment/fetchPaymentList",
    async (payload, thunkApi) => {
        try {
            const response = await PaymentService.getPaymentList(payload);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const fetchPaymentDetail = createAsyncThunk(
    "payment/fetchPaymentDetail",
    async (payload, thunkApi) => {
        try {
            const response = await PaymentService.getPayment(payload);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkApi.rejectWithValue("error");
        }
    }
);

export const PaymentActions = {
    fetchPaymentList,
    fetchPaymentDetail,
};

const PaymentSlice = createSlice({
    name: "payment",
    initialState: {
        status: null,
        count: 0,
        paymentList: [],
        selectedPayment: {},
    },
    extraReducers: {
        [fetchPaymentList.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchPaymentList.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.count = action.payload.count;
            state.paymentList = action.payload.rows;
        },
        [fetchPaymentList.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
        [fetchPaymentDetail.pending]: (state) => {
            state.status = statusConstants.PENDING;
        },
        [fetchPaymentDetail.fulfilled]: (state, action) => {
            state.status = statusConstants.FULFILLED;
            state.selectedPayment = action.payload;
        },
        [fetchPaymentDetail.rejected]: (state) => {
            state.status = statusConstants.REJECTED;
        },
    },
});

export default PaymentSlice.reducer;
