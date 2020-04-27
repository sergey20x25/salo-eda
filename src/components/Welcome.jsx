import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    display: 'flex',
    textAlign: 'center',
  },
}));

export const Welcome = ({ handleLogin }) => {
  const classes = useStyles();
  console.log('welcome');
  return (
    <div className={classes.root}>
      <Typography variant="h2" component="div" className={classes.text}>
        ВОЙДИТЕ С РАБОЧЕГО АККАУНТА :)
      </Typography>
      <Button color="inherit" variant="outlined" onClick={handleLogin}>
        ВОЙТИ
      </Button>
    </div>
  );
};
