import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    display: 'flex',
    textAlign: 'center',
  },
}));

export const Welcome = ({ wrongAccount }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="div" className={classes.text}>
        {wrongAccount
          ? 'ВОЙДИТЕ С РАБОЧЕГО АККАУНТА'
          : 'ВОЙДИТЕ :)'}
      </Typography>
    </div>
  );
};
