import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchFoodItems = createAsyncThunk(
  'foodItems/fetchFoodItems',
  async (url) => {
    const response = await axios.get(`${url}/foodItems.json`);
    const entries = Object.entries(response.data);
    const entriesWithId = entries.map(([id, item]) => [id, { ...item, id }]);
    const payload = Object.fromEntries(entriesWithId);
    return payload;
  },
);

const initialState = {
  byId: {},
  allIds: [],
  fetchingState: 'idle',
  currentRequestId: undefined,
  error: null,
};

const slice = createSlice({
  name: 'foodItems',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFoodItems.pending]: (state, { meta }) => {
      if (state.fetchingState === 'idle') {
        state.fetchingState = 'pending';
        state.currentRequestId = meta.requestId;
      }
    },
    [fetchFoodItems.fulfilled]: (state, { meta, payload }) => {
      const { requestId } = meta;
      if (state.fetchingState === 'pending' && state.currentRequestId === requestId) {
        state.fetchingState = 'idle';
        state.byId = payload;
        state.allIds = Object.keys(payload);
        state.currentRequestId = undefined;
      }
    },
    [fetchFoodItems.rejected]: (state, { error, meta }) => {
      const { requestId } = meta;
      if (state.fetchingState === 'pending' && state.currentRequestId === requestId) {
        state.fetchingState = 'idle';
        state.error = error;
        state.currentRequestId = undefined;
      }
    },
  },
});


export { fetchFoodItems };

export default slice.reducer;
