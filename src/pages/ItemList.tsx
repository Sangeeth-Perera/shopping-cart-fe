import { Checkbox, createStyles, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Select, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/itemCard/ItemCard";
import ItemTableList from "../components/list/ItemTableList";
import { getAllItems } from "../services/ItemList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const ItemList = (props: any) => {
    const classes = useStyles();

    const [itemList, setItemList] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = React.useState<any>('cardMode');
    const [itemType, setItemType] = React.useState('PEC');
    const [itemType1, setItemType1] = React.useState('1');

    const loadItemList = async (itemType: string) => {
        try {
            setLoading(true);
            const response = await getAllItems(itemType);
            setItemList(response.data);

        } catch (error) {

        }
        setLoading(false);

    }

    const handleItemChange = (value: any) => {
        setItemType(value);
    };


    useEffect(() => {
        loadItemList(itemType);
    }, [itemType]);



    return (
        <Grid container spacing={2}>
            <Grid item lg={6} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="item-type">Item Type</InputLabel>
                    <Select
                        labelId="item-type"
                        id="item-type"
                        value={itemType}
                        onChange={(e: any) => handleItemChange(e.target.value)}
                    >
                        <MenuItem value="HC">Horseshoe(HC)</MenuItem>
                        <MenuItem value="PEC">Penguin-ears(PEC)</MenuItem>
                        {/* <MenuItem value="All">All-not support</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={6} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="item-type">Item Type</InputLabel>
                    <Select
                        labelId="item-type"
                        id="item-type"
                        value={itemType1}
                        onChange={(e: any) => setItemType1(e.target.value)}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        {/* <MenuItem value="All">All-not support</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            {itemType === 'PEC' && (
                <Grid item lg={6} sm={6}>
                <Typography variant='h1'>Sangeeth</Typography>
           </Grid>)}
            <Grid item lg={6} sm={6}>
                <Typography>View Mode</Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={viewMode === "listMode"}
                            onChange={() => setViewMode("listMode")}
                            name="viewMode"

                        />
                    }
                    label="List"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={viewMode === "cardMode"}
                            onChange={() => setViewMode("cardMode")}
                            name="viewMode"
                        />
                    }
                    label="Card"
                />
            </Grid>

            {viewMode === "cardMode" ? (
                <React.Fragment>
                    {itemList ?
                        Object.keys(itemList).map(key => (
                            <Grid key={key} item lg={3} sm={6}>
                                <ItemCard itemCode={itemType} count={key} value={itemList[key]} />
                            </Grid>
                        )) : <Grid item lg={12} sm={12}> Loading...</Grid>}
                </React.Fragment>) : (

                <ItemTableList itemCode={itemType} itemList = {itemList}/>)}

        </Grid>
    );
}

export default ItemList;