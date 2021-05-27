import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '.';
import { getItemTotal } from '../services/ItemList';

export interface ICart {
    items: any[];
    total: number;
}

const initialState: ICart = {
    items: [],
    total: 0
};

export const Cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        calculateTotal: (state) => {
            let totalVar: number = 0;
            state.items.forEach((item, index) => {
                totalVar = totalVar + parseFloat(item.price);
            });
            state.total = totalVar;
        },
        addCartItem: (state, action) => {
            let itemStatus = 'new';
            if (state.items.length) {
                state.items.forEach((item, index) => {
                    if (item.id == action.payload.id) {
                        state.items[index] = action.payload;
                        itemStatus = "exist"
                    }
                })
            }
            if (itemStatus == "new") {
                state.items.push(action.payload);
            }
        },
    }
})

export const calculatePriceAsync = (itemCode: string, quantity: number, cartQuantity: number, operator: string): AppThunk => async dispatch => {
    try {
        let quantityVar: number;
        if (operator == 'remove') {
            quantityVar = cartQuantity - 1;
        }
        else {
            quantityVar = cartQuantity + quantity;
        }
        if (quantityVar >= 0) {
            const response = await getItemTotal(itemCode, quantityVar);
            let itemObj = {
                id: itemCode,
                count: quantityVar,
                price: response.data
            }
            dispatch(addCartItem(itemObj));
            dispatch(calculateTotal());
        }
    } catch (error) {
        console.log("error");
        alert(error);
    }
};

export const { calculateTotal, addCartItem } = Cart.actions;


export default Cart.reducer;
