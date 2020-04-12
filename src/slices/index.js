import { combineReducers } from 'redux';
import cart, { actions as cartActions } from './cart';
import filters, { actions as filtersActions } from './filters';
import foodItems, { fetchFoodItems } from './foodItems';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  cart,
  filters,
  foodItems,
  modal,
});

export const actions = {
  ...cartActions,
  ...filtersActions,
  ...modalActions,
  fetchFoodItems,
};
