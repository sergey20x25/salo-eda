import { createSelector } from '@reduxjs/toolkit';

const foodItemsSelector = (state) => state.foodItems.entities;
const providersFilterSelector = (state) => state.filters.provider;
const foodTypeFilterSelector = (state) => state.filters.foodType;
const cartIdsSelector = (state) => state.cart.allIds;
const cartItemsSelector = (state) => state.cart.byId;

export const filteredfoodItemsSelector = createSelector(
  foodItemsSelector,
  providersFilterSelector,
  foodTypeFilterSelector,
  (foodItems, providerKeys, foodTypeKeys) => foodItems
    .filter((item) => providerKeys.includes(item.provider))
    .filter((item) => foodTypeKeys.includes(item.foodType)),
);

export const cartCounterSelector = createSelector(
  cartIdsSelector,
  cartItemsSelector,
  (ids, items) => ids.reduce((acc, id) => acc + items[id].amount, 0),
);

export const cartItemsToShowSelector = createSelector(
  cartIdsSelector,
  cartItemsSelector,
  (ids, items) => ids.map((id) => items[id]),
);
