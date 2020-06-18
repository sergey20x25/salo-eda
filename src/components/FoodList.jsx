import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FoodCard } from './FoodCard';
import { actions } from '../slices';
import { filteredfoodItemsSelector } from '../selectors';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px',
  },
}));

export const FoodList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const entities = useSelector(filteredfoodItemsSelector);

  const handleAddToCard = (id, name) => () => {
    dispatch(actions.addToCart({ id, name, amount: 1 }));
  };
  console.log('foodlist');

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {entities.map((item) => (
          <FoodCard key={item.id} item={item} handleAddToCard={handleAddToCard} />))}
      </Grid>
    </div>
  );
};
