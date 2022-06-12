import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import { Button, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import RemoveIcon from '@material-ui/icons/Remove';
import { calculatePriceAsync } from '../../store/CartSlice';
import CommonUtils from '../../util/CommonUtils';
import { AddCircleRounded } from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        list: {
            width: "100%"
        },
        
    }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

export default function CartItem(props: any) {
    const classes = useStyles();

    const { item } = props;
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.items);

    const handleRemove = (item: any) => {
        let cartQuantity = CommonUtils.getCartItemQty(items, item.id);
        dispatch(calculatePriceAsync(item.id, item.count, cartQuantity, "remove" ));
    }

    const handleAdd = (item: any) => {
        let cartQuantity = CommonUtils.getCartItemQty(items, item.id);
        dispatch(calculatePriceAsync(item.id, item.count, cartQuantity, "add-single-unit" ));
    }


    if (item) {
        return (
            <div  style ={{width:"100%"}} id={item.id}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 4fr 2fr 1fr 1fr' }}>
                    <div>
                        <div>Item Code: {item.id}</div>
                        <div>Count : {item.count}</div>
                    </div>
                    <div></div>
                    <div style={{alignContent:"center"}}>$ {item.price}</div>
                    <div><IconButton onClick={() => handleRemove(item)} style={{ color: "#FFFF" }}><RemoveIcon /></IconButton></div>
                    <div><IconButton onClick={() => handleAdd(item)} style={{ color: "#FFFF" }}><AddCircleRounded /></IconButton></div>
                </div>
            </div>
        );
    }
    else
        return (<></>);
}

