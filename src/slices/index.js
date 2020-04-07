import { combineReducers } from 'redux';
import foodItems, { fetchFoodItems } from './foodItems';
import filters, { actions as filtersActions } from './filters';

export default combineReducers({
  foodItems,
  filters,
});

export const actions = {
  ...filtersActions,
  fetchFoodItems,
};
