import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AddShoppingCart } from '@material-ui/icons';
import Cart from '../cart/Cart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom:"100px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar : {
      backgroundColor : "#b54e04"
    }
  }),
);

 function TopBar() {
  const classes = useStyles();

  const [openCart, setOpenCart] = useState(false);

  const handleClose = ()=>{
    setOpenCart(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          <IconButton color="inherit" onClick={()=>setOpenCart(!openCart)}><AddShoppingCart/></IconButton>
        </Toolbar>
      </AppBar>
      <Cart modalOpen={openCart} handleClose={handleClose}/>
    </div>
  );
}

export default TopBar;