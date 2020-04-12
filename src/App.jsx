import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider, IfFirebaseAuthedAnd, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Navbar } from './components/Navbar';
import { FoodList } from './components/FoodList';
import { Filter } from './components/Filter';
import { ModalRoot } from './components/ModalRoot';
import { Welcome } from './components/Welcome';
import { firebaseConfig } from './firebaseConfig';
import { actions } from './slices';
import { filteredfoodItemsSelector } from './selectors';
import { providerFilters, foodTypeFilters } from './filterValues';

const useStyles = makeStyles((theme) => ({
  main: {
    // paddingRight: '1rem',
  },
}));

const App = () => {
  const { fetchingState } = useSelector((state) => state.foodItems);
  const entities = useSelector(filteredfoodItemsSelector);
  const dispatch = useDispatch();
  const { fetchFoodItems } = actions;
  const url = process.env.REACT_APP_DB_URL;
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchFoodItems(url));
  }, []);

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const handleLogin = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <CssBaseline />
      <Navbar handleLogin={handleLogin} handleLogout={handleLogout} />
      <IfFirebaseUnAuthed>
        {() => <Welcome />}
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthedAnd
        filter={({ user }) => !user.email.includes('@aviasales.ru')}
      >
        {() => <Welcome wrongAccount />}
      </IfFirebaseAuthedAnd>
      <IfFirebaseAuthedAnd
        filter={({ user }) => user.email.includes('@aviasales.ru')}
      >
        {() => (
          <Grid container>
            <Grid container item xs={12} sm={3} direction="column" className={classes.side}>
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
            <Grid item xs={12} sm={9} className={classes.main}>
              {fetchingState === 'pending'
                ? <CircularProgress />
                : <FoodList list={entities} />}
            </Grid>
          </Grid>
        )}
      </IfFirebaseAuthedAnd>
      <ModalRoot />
    </FirebaseAuthProvider>
  );
};

export default App;
