import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CartIcon } from './CartIcon';
import { Login } from './Login';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = ({ handleLogin, handleLogout }) => {
  const classes = useStyles();
  console.log('navbar');
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SALO – ЕДА
          </Typography>
          <CartIcon counter={4} />
          <Login handleLogin={handleLogin} handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
