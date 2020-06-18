import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Navbar } from './components/Navbar';
import { FoodList } from './components/FoodList';
import { Filter } from './components/Filter';
import { ModalRoot } from './components/ModalRoot';
import { actions } from './slices';
import { providerFilters, foodTypeFilters } from './filterValues';

const AuthentificatedApp = ({ handleLogin, handleLogout }) => {
  const dispatch = useDispatch();
  const { fetchFoodItems } = actions;
  const url = process.env.REACT_APP_DB_URL;

  useEffect(() => {
    dispatch(fetchFoodItems(url));
  }, []);

  return (
    <>
      <Navbar handleLogin={handleLogin} handleLogout={handleLogout} />
      <Grid container>
        <Grid container item xs={12} sm={3} direction="column">
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
        <Grid item xs={12} sm={9}>
          <FoodList />
        </Grid>
      </Grid>
      <ModalRoot />
    </>
  );
};

export default AuthentificatedApp;
