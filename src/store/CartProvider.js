import React from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
    const addItemToCartHandler = (item) => {}
    const removeItemFromCartHandler = (item) => {}
    
    const cartProviderValue = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler, 
        removeItem: removeItemFromCartHandler,
    };
  return (
    //Creating this here instead of managing context in App.js
    <CartContext.Provider value={cartProviderValue}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;