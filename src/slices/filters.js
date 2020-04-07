import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provider: [],
  foodType: [],
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    loadFilter(state, { payload: { name, filterKeys } }) {
      state[name] = filterKeys;
    },
    changeFilter(state, { payload: { name, filterKey } }) {
      if (state[name].includes(filterKey)) {
        state[name] = state[name].filter((key) => key !== filterKey);
      } else {
        state[name].push(filterKey);
      }
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
