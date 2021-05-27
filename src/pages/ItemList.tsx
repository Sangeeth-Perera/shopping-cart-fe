import { Checkbox, createStyles, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Select, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { isTemplateExpression } from "typescript";
import ItemCard from "../components/itemCard/ItemCard";
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
    const [viewMode, setViewMode] = React.useState<any>('');
    const [itemType, setItemType] = React.useState('HC');


    const loadItemList = async (itemType: string) => {
        try {
            setLoading(true);
            const response = await getAllItems(itemType);
            setItemList(response.data);

        } catch (error) {

        }
        setLoading(false);

    }

    const handleItemChange = async (value: any) => {
        setItemType(value);
    };


    useEffect(() => {

        loadItemList(itemType);
    }, [itemType])



    return (
        <Grid container spacing={2}>
            <Grid item lg={6} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Item Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={itemType}
                        onChange={(e: any) => handleItemChange(e.target.value)}
                    >
                        <MenuItem value="HC">Horseshoe</MenuItem>
                        <MenuItem value="PEC">Penguin-ears</MenuItem>
                        {/* <MenuItem value="All">All-not support</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item lg={6} sm={6}>
                <Typography>View Mode</Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={viewMode == "listMode"}
                            onChange={() => setViewMode("listMode")}
                            name="viewMode"

                        />
                    }
                    label="List"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={viewMode == "small"}
                            onChange={() => setViewMode("small")}
                            name="viewMode"
                        />
                    }
                    label="Card"
                />
            </Grid>


            {itemList ?
                Object.keys(itemList).map(key => (
                    <Grid key={key} item lg={3} sm={6}>
                        <ItemCard itemCode={itemType} count={key} value={itemList[key]} />
                    </Grid>
                )) : null}
        </Grid>
    );
}

export default ItemList;