import React from 'react';

class CommonUtils {

    static getCartItemQty = (items: any[], itemCode: string) => {
        let cartQuantity: number = 0;
        items.forEach((item, index) => {
            if (item.id == itemCode) {
                cartQuantity = parseInt(items[index].count);
            }
        });
        return cartQuantity;
    }

}

export default CommonUtils;