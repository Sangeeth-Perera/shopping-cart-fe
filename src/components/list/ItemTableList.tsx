import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Grid } from '@material-ui/core';
import CommonUtils from '../../util/CommonUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { calculatePriceAsync } from '../../store/CartSlice';

const useStyles = makeStyles({
  table: {
    maxWidth:"70%",
    alignSelf:"center",
    margin:"100px"
  },
  addCart: {

    "&:hover": {
      background: "#ba4a04",
      font: "#FFF"
    },
  }
});



export default function ItemTableList(props: any) {
  const { itemCode, itemList } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.items);

  const handleAdd = (itemCode: any, count: any, value: any) => {

    let cartQuantity: number = 0;
    cartQuantity = CommonUtils.getCartItemQty(items, itemCode);
    dispatch(calculatePriceAsync(itemCode, parseInt(count), cartQuantity, "Add"));
  }

  return (
    <Grid container>
      <Grid item sm={12} lg={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item Code</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price&nbsp;($)</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList ?
                Object.keys(itemList).map(key => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {itemCode}
                    </TableCell>
                    <TableCell align="right">{key}</TableCell>
                    <TableCell align="right">{itemList[key]}</TableCell>
                    <TableCell align="right"><Button className={classes.addCart} onClick={() => handleAdd(itemCode, key, itemList[key])}>Add to Cart</Button></TableCell>
                  </TableRow>
                )) : ( <TableRow key="no-data"><TableCell colSpan={4}>No Data</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
