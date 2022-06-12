
import { get, post, put, delete_ } from "./xhr";


export function getAllItems(itemCode:string) {
    return get(`${process.env.REACT_APP_CART_SERVER}/shopping-cart/get-price-list/${itemCode}`);
}

export function getItemTotal(itemCode:string, quantity:number) {
    return get(`${process.env.REACT_APP_CART_SERVER}/shopping-cart/get-item-total?itemCode=${itemCode}&quantity=${quantity}`);
}
