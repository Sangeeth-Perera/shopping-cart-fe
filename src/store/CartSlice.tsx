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
        addItem: (state, action) => {
            let addedItem: any = {...action.payload};
            let itemVar:any={};
            let found = false;
            state.items.forEach((item, index) => {
                console.log(item);
                if (item.id == action.payload.id) {
                    
                    state.items[index].count = parseInt(state.items[index].count) + parseInt(addedItem.count) ;
                    state.total =  parseFloat((state.total + (parseFloat(addedItem.price))).toFixed(2));
                    found = true;
                } 
            })

            if (found == false) {
                itemVar.id    = addedItem.id;
                itemVar.count = addedItem.count;
                itemVar.price = addedItem.price;
                state.items.push(itemVar);
                state.total   =  state.total + (parseFloat(addedItem.price));
            }
        },
        calculateTotal: (state) => {
            let totalVar:number = 0;
            state.items.forEach((item, index) => {
                totalVar = totalVar +  parseFloat(item.price);
            });
            state.total = totalVar;
        },
        removeItem: (state, action) => {
            const prevItems = [...state.items];
            state.items.forEach((value, i) => {
                if (value.id == action.payload.id) {
                    if (value.count > 1) {
                        prevItems[i].count--;
                    } else {
                        prevItems.splice(i);
                    }
                    state.total =  parseFloat((state.total - parseFloat((value.price))).toFixed(2));
                    // state.items.splice(i);
                }
            })
            state.items = [...prevItems];
             
        },
        addCartItem: (state, action) => { 
            let itemStatus ='new';
            if (state.items.length) {
                state.items.forEach((item, index) => {
                if (item.id == action.payload.id) {
                    state.items[index] = action.payload; 
                    itemStatus = "exist"
                }
            }) }

            if (itemStatus == "new") {
                state.items.push(action.payload);
            }
            
        },
    }
})

export const calculatePriceAsync = (itemCode: string, quantity:number, cartQuantity:number, operator:string): AppThunk => async dispatch => {
    try {
        let quantityVar:number;
        if (operator == 'remove') {
            quantityVar = cartQuantity-1;
        }
        else {
            quantityVar = cartQuantity + quantity;
        }
        const response = await getItemTotal(itemCode, quantityVar);
        let itemObj = {
            id    : itemCode,
            count : quantityVar,
            price : response.data
          }
        dispatch(addCartItem(itemObj));
        dispatch(calculateTotal());     
         
    } catch (error) {
        console.log("error");
        alert(error);
    }
  };

export const { addItem, calculateTotal, addCartItem,  removeItem } = Cart.actions;


export default Cart.reducer;
