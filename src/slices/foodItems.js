import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebaseApp from '../firebase';

const db = firebaseApp.firestore();

const fetchFoodItems = createAsyncThunk(
  'foodItems/fetchFoodItems',
  async () => {
    const entries = [];
    const snapshot = await db.collection('foodItems').get();
    snapshot.forEach((doc) => {
      entries.push([doc.id, { ...doc.data(), id: doc.id }]);
    });
    const payload = Object.fromEntries(entries);
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
