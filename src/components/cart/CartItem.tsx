import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ClearIcon from '@material-ui/icons/Clear';
import { calculatePriceAsync, removeItem } from '../../store/CartSlice';
import CommonUtils from '../../util/CommonUtils';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        list: {
            width: "100%"
        }
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


    if (item) {
        return (
            <div id={item.id}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 4fr 2fr 1fr' }}>
                    <div>
                        <div>Item Code: {item.id}</div>
                        <div>Count : {item.count}</div>
                    </div>
                    <div></div>
                    <div style={{alignContent:"center"}}>$ {item.price}</div>
                    <div><IconButton onClick={() => handleRemove(item)} style={{ color: "#FFFF" }}><ClearIcon /></IconButton></div>
                </div>
            </div>
        );
    }
    else
        return (<></>);
}

