import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '36px',
    height: '36px',
    marginLeft: '1rem',
    cursor: 'pointer',
  },
}));

export const Login = ({ handleLogin, handleLogout }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentUser = useContext(AuthContext);

  console.log('login');
  return (
    <>
      <Tooltip title={currentUser.displayName} onClick={handleClick}>
        <Avatar src={currentUser.photoURL} className={classes.avatar} />
      </Tooltip>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogin}>Сменить пользователя</MenuItem>
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </>
  );
};
