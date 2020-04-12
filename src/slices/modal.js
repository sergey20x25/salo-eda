import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: {},
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(_, { payload }) {
      return { ...payload };
    },
    hideModal() {
      return initialState;
    },
  },
});

export const actions = { ...slice.actions };
export default slice.reducer;
