import React, {useReducer} from 'react';
import CartContext from './cart-context';

//default state values that will be updated with the reducer function
let initialCart = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.val === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    const updatedAmount = state.totalAmount + action.item.price * action.item.amount;

    return{
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  return initialCart;
}

const CartProvider = (props) => {

  const [cartState, dispatchCart] = useReducer(cartReducer, initialCart);

  const addItemToCartHandler = (item) => {
    dispatchCart({val:'ADD', item:item});
  }

  const removeItemFromCartHandler = (item) => {

  }

  //state values from the reducer functions that we pass 
  //into the CartContext.Provider that surrounds APP.js
    const cartProviderValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
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