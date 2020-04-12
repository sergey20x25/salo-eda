import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash-es/omit';

const initialState = {
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload: { id, name, amount } }) {
      if (state.byId[id]) {
        state.byId[id].amount += 1;
      } else {
        state.byId[id] = { id, name, amount };
        state.allIds.push(id);
      }
    },
    editItemAmount(state, { payload: { id, amount } }) {
      if (amount === 0) {
        const newAllIds = state.allIds.filter((itemId) => itemId !== id);
        const newById = omit(state.byId, id);
        state.byId = newById;
        state.allIds = newAllIds;
      } else {
        state.byId[id].amount = amount;
      }
    },
    clearCart() {
      return initialState;
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
