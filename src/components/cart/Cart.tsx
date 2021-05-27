import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CartItem from "./CartItem";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: "100px",
        },
        modalRight: {
            right: 0,
            height: "100%",
            position: "absolute",
            OverflowEvent: "hidden",
            transition: "1.6s",
            paddingTop: "60px",
            overflow: "scroll",

        },
        title : {
            fontSize:"32px",
            padding: "20px 20px 20px 20px",
        },
        modalPaper: {
            position: "absolute",
            width: "40%",
            height: "auto",
            margin: "auto",
            top: "0",
            bottom: "0",
            // left: "0",
            color: "#FFF",
            backgroundColor: "#1c1b1a",
            right: "0",
            borderRadius: "4px",
            overflow: "scroll",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(1, 2, 2),

            ['@media (min-width: 320px) and (max-width: 575px)']: {
                width: '90%',
                top: "10px",
                bottom: "0",
                left: "0",
            },

            ['@media (min-width: 576px) and (max-width: 767px)']: {
                width: '90%',
                top: "10px",
                bottom: "0",
                left: "0",
            },

            ['@media (min-width: 768px) and (max-width: 991px)']: {
                width: '90%',
                top: "10px",
                bottom: "0",
                left: "0",
            },
        },
        
    }),
    
);


export default function Cart(props: any) {

    const {
        modalOpen,
        handleClose,
    } = props;
    const classes = useStyles();

    const totalPrice = useSelector((state: RootState) => state.total);
    const cartItems = useSelector((state: RootState) => state.items);


    const body = (
        <div className={classes.modalPaper}>
            <Grid container>
                <Grid item lg={12} sm={12}>
                    <Typography className = {classes.title}>Cart Information</Typography>
                </Grid>
                {cartItems.map((item: any) => (
                    <React.Fragment>
                        <CartItem key={item.id} id={item.id} item={item} />
                    </React.Fragment>
                ))}
                <Grid item lg={12} sm={12}>
                    <hr/>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr  2fr 1fr' }}>
                    <div>
                        <div>Total</div>
                    </div>
                    <div>$ {totalPrice}</div>
                    <div></div>
                </div>
                </Grid>
            </Grid>
        </div>);

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="right-modal-title"
                aria-describedby="add-edit-location"
                className={classes.modalRight}
            >
                {body}
            </Modal>
            {/* <div id="edit-location-modal"   className={classes.sidenav} style = {{width:props.navWidth}}> */}
        </div>
        // </div>
    );
}
