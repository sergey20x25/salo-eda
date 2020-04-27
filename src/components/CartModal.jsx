import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { cartItemsToShowSelector } from '../selectors';
import { actions } from '../slices';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3),
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

export const CartModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.modal);
  const isOpen = modalType !== null;
  const cartItems = useSelector(cartItemsToShowSelector);

  const handleClose = () => {
    dispatch(actions.hideModal());
  };

  const handleIncrement = (id, amount) => () => {
    dispatch(actions.editItemAmount({ id, amount: amount + 1 }));
  };

  const handleDecrement = (id, amount) => () => {
    dispatch(actions.editItemAmount({ id, amount: amount - 1 }));
  };
  console.log('cartmodal');
  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="cart"
      aria-describedby="Shopping cart"
    >
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          КОРЗИНА
        </Typography>
        {cartItems.map((item) => (
          <div key={item.id} className={classes.item}>
            <Typography variant="body1">{item.name}</Typography>
            &nbsp;
            <ButtonGroup size="small">
              <Button onClick={handleDecrement(item.id, item.amount)}>-</Button>
              <Button disabled>{item.amount}</Button>
              <Button onClick={handleIncrement(item.id, item.amount)}>+</Button>
            </ButtonGroup>
          </div>
        ))}
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleClose}
        >
          close
        </Button>
      </div>
    </Modal>
  );
};
