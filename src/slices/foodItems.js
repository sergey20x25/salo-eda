import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchFoodItems = createAsyncThunk(
  'foodItems/fetchFoodItems',
  async (url) => {
    const response = await axios.get(`${url}/foodItems.json`);
    const payload = Object.keys(response.data || []).map((key) => ({
      ...response.data[key],
      id: key,
    }));
    return payload;
  },
);

const initialState = {
  entities: [],
  fetchingState: 'idle',
  currentRequestId: undefined,
  error: null,
};

const slice = createSlice({
  name: 'foodItems',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFoodItems.pending]: (state, action) => {
      if (state.fetchingState === 'idle') {
        state.fetchingState = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchFoodItems.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.fetchingState === 'pending' && state.currentRequestId === requestId) {
        state.fetchingState = 'idle';
        state.entities = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [fetchFoodItems.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.fetchingState === 'pending' && state.currentRequestId === requestId) {
        state.fetchingState = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});


export { fetchFoodItems };

export default slice.reducer;
