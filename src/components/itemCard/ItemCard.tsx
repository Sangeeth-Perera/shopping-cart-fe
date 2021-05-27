import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useDispatch, useSelector } from "react-redux";

import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import { Button, Grid } from '@material-ui/core';
import {  calculatePriceAsync } from '../../store/CartSlice';
import { RootState } from '../../store';
import CommonUtils from '../../util/CommonUtils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    countFont: {
      fontSize: "42px"
    },
  }),
);

export default function ItemCard(props: any) {

  const classes = useStyles();
  const { count, value, itemCode } = props;
  const dispatch = useDispatch();


  const items = useSelector((state: RootState) => state.items);

  const handleAdd = (itemCode: any, count: any, value: any) => {

    let cartQuantity: number = 0;

    cartQuantity = CommonUtils.getCartItemQty(items, itemCode);

    dispatch(calculatePriceAsync(itemCode, parseInt(count), cartQuantity, "Add"));
  }

  return (
    <Card id={itemCode} className={classes.root}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Quantity
        </Typography>
        <Typography className={classes.countFont} variant="body2" color="textSecondary" component="p">
          {count}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price : <b>$ {value}</b>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Item Code :  {itemCode}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container>
          <Grid item lg={12} sm={12}>
            <Button onClick={() => handleAdd(itemCode, count, value)}>Add to Cart</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
