import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import statusConstants from "../../constants/status.constants";
import { ProviderService } from "../../services";

const fetchProviderList = createAsyncThunk(
  "provider/fetchProviderList",
  async (payload, thunkApi) => {
    try {
      const response = await ProviderService.getProviderList(payload);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const fetchProviderDetail = createAsyncThunk(
  "provider/fetchProviderDetail",
  async (payload, thunkApi) => {
    try {
      const response = await ProviderService.getProviderDetail(payload);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue("error");
    }
  }
);

const ProviderSlice = createSlice({
  name: "provider",
  initialState: {
    status: null,
    count: 0,
    providerList: [],
    selectedProvider: {},
    isProviderDeleted: null,
    id: null,
  },
  reducers: {
    DeleteProvider: (state, action) => {
      state.isProviderDeleted = action.payload;
    },
    ProviderId: (state, action) => {
      state.id = action.payload;
    },
  },
  extraReducers: {
    [fetchProviderList.pending]: (state) => {
      state.status = statusConstants.PENDING;
    },
    [fetchProviderList.fulfilled]: (state, action) => {
      state.status = statusConstants.FULFILLED;
      state.count = action.payload.count;
      state.providerList = action.payload.rows;
    },
    [fetchProviderList.rejected]: (state) => {
      state.status = statusConstants.REJECTED;
    },
    [fetchProviderDetail.pending]: (state) => {
      state.status = statusConstants.PENDING;
    },
    [fetchProviderDetail.fulfilled]: (state, action) => {
      state.status = statusConstants.FULFILLED;
      state.selectedProvider = action.payload;
    },
    [fetchProviderDetail.rejected]: (state) => {
      state.status = statusConstants.REJECTED;
    },
  },
});

export const ProviderActions = {
  ...ProviderSlice.actions,
  fetchProviderList,
  fetchProviderDetail,
};

export default ProviderSlice.reducer;
