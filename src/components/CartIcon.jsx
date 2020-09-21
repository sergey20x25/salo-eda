import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AuthContext } from '../context/AuthContext';
import { cartCounterSelector } from '../selectors';
import { actions } from '../slices/modal';

export const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCounter = useSelector(cartCounterSelector);

  const handleClick = () => {
    dispatch(actions.showModal({ modalType: 'CART' }));
  };

  const currentUser = useContext(AuthContext);

  console.log('carticon');

  return (
    <>
      {currentUser
        ? (
          <IconButton color="inherit" onClick={handleClick}>
            <Badge badgeContent={cartCounter}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )
        : null}
    </>
  );
};
