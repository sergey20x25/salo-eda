import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  actions: {
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  media: {
    height: 200,
  },
});

export const FoodCard = ({ item, handleAddToCard }) => {
  const classes = useStyles();
  const {
    id,
    name,
    providerTitle,
    img,
    price,
  } = item;

  return (
    <Grid item xs={6} sm={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h2" noWrap>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {providerTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleAddToCard(id, name)}
            endIcon={<AddShoppingCartIcon />}
          >
            {price}
            &nbsp;Бат&nbsp;
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
