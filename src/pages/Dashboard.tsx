import { Button, Checkbox, createStyles, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Select, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

const Dashboard = (props: any) => {
    const classes = useStyles();
    const navigate = useNavigate();

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
                <Typography>Welcome to Dashbaord</Typography>
                <Button onClick={()=>navigate('/view-items')}>View Items</Button>
            </Grid>
        </Grid>
    );
}

export default Dashboard;