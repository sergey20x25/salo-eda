import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const Cart = ({ counter }) => (
  <IconButton color="inherit">
    <Badge badgeContent={counter}>
      <ShoppingCartIcon />
    </Badge>
  </IconButton>
);
