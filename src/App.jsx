import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Navbar } from './components/Navbar';
import { FoodList } from './components/FoodList';
import { Filter } from './components/Filter';
import { actions } from './slices';
import { providerFilters, foodTypeFilters } from './filterValues';
import { filteredfoodItemsSelector } from './selectors';

const App = () => {
  const { fetchingState } = useSelector((state) => state.foodItems);
  const entities = useSelector(filteredfoodItemsSelector);
  const dispatch = useDispatch();
  const { fetchFoodItems } = actions;
  const url = process.env.REACT_APP_DB_URL;

  useEffect(() => {
    dispatch(fetchFoodItems(url));
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Grid container>
        <Grid container sm={3} direction="column">
          <Filter
            values={providerFilters.values}
            name={providerFilters.name}
            title={providerFilters.title}
          />
          <Filter
            values={foodTypeFilters.values}
            name={foodTypeFilters.name}
            title={foodTypeFilters.title}
          />
        </Grid>
        <Grid item sm={9}>
          {fetchingState === 'pending'
            ? <CircularProgress />
            : null}
          <FoodList list={entities} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
