import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ListSubheader from '@material-ui/core/ListSubheader';
import { actions } from '../slices';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'white',
  },
}));

export const FoodList = ({ list }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddToCard = (id, name) => () => {
    dispatch(actions.addToCart({ id, name, amount: 1 }));
  };

  return (
    <div className={classes.root}>
      <GridList cols={3} cellHeight={220} spacing={10}>
        <GridListTile cols={3} key="Subheader" style={{ height: 'auto' }}>
          <ListSubheader component="div">Доступная хавка</ListSubheader>
        </GridListTile>
        {list.map((item) => (
          <GridListTile key={item.id}>
            <img src={item.img} alt={item.name} />
            <GridListTileBar
              title={item.name}
              subtitle={(
                <span>
                  от:&nbsp;
                  {item.providerTitle}
                </span>
              )}
              actionIcon={(
                <IconButton
                  aria-label={`добавить в корзину ${item.name}`}
                  className={classes.icon}
                  onClick={handleAddToCard(item.id, item.name)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              )}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
