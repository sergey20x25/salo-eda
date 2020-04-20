import React from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '36px',
    height: '36px',
    marginRight: '1rem',
    marginLeft: '1rem',
  },
}));

export const Login = ({ handleLogin, handleLogout }) => {
  const classes = useStyles();

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {
        if (isSignedIn) {
          return (
            <>
              <Tooltip title={user.displayName}>
                <Avatar src={user.photoURL} className={classes.avatar} />
              </Tooltip>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                ВЫЙТИ
              </Button>
            </>
          );
        }
        return (
          <Button color="inherit" variant="outlined" onClick={handleLogin}>
            ВОЙТИ
          </Button>
        );
      }}
    </FirebaseAuthConsumer>
  );
};
