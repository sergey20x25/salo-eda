import { createSelector } from '@reduxjs/toolkit';

const foodItemsSelector = (state) => state.foodItems.entities;
const providersFilterSelector = (state) => state.filters.provider;
const foodTypeFilterSelector = (state) => state.filters.foodType;

export const filteredfoodItemsSelector = createSelector(
  foodItemsSelector,
  providersFilterSelector,
  foodTypeFilterSelector,
  (foodItems, providerKeys, foodTypeKeys) => {
    return foodItems
      .filter((item) => providerKeys.includes(item.provider))
      .filter((item) => foodTypeKeys.includes(item.foodType));
  },
);
