import { createSelector } from '@reduxjs/toolkit';

const foodItemsSelector = (state) => state.foodItems.byId;
const providersFilterSelector = (state) => state.filters.provider;
const foodTypeFilterSelector = (state) => state.filters.foodType;
const cartIdsSelector = (state) => state.cart.allIds;
const cartItemsSelector = (state) => state.cart.byId;

export const filteredfoodItemsSelector = createSelector(
  foodItemsSelector,
  providersFilterSelector,
  foodTypeFilterSelector,
  (foodItems, providerKeys, foodTypeKeys) => Object.values(foodItems)
    .filter((item) => providerKeys.includes(item.provider))
    .filter((item) => foodTypeKeys.includes(item.foodType)),
);

export const cartCounterSelector = createSelector(
  cartIdsSelector,
  cartItemsSelector,
  (ids, items) => ids.reduce((acc, id) => acc + items[id].amount, 0),
);

export const cartItemsToShowSelector = createSelector(
  cartItemsSelector,
  cartIdsSelector,
  foodItemsSelector,
  (cartItems, ids, items) => ids.map((id) => ({ ...items[id], amount: cartItems[id].amount })),
);

export const cartTotalPriceSelector = createSelector(
  cartItemsSelector,
  cartIdsSelector,
  foodItemsSelector,
  (cartItems, ids, items) => ids.reduce((acc, id) => (
    acc + (items[id].price * cartItems[id].amount)), 0),
);
