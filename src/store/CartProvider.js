import React, {useReducer} from 'react';
import CartContext from './cart-context';

//default state values that will be updated with the reducer function
let initialCart = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.val === 'ADD') {
    const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
    // Check to see if the item is already in the array/cart, if yes, this returns the index
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    //Then get the item from the array by it's index, store it in a variable
    const existingItem = state.items[existingItemIndex];
    //If there is an existing item, update the price amount for that item
    let updatedItem;
    let updatedItems;
    if (existingItem) {
      updatedItem = {
        //copy over the existing data for that item object, updated the amount
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      }
      //replace the existing item in the array with the updatedItem
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      //If no item already exists, just add the new item to the array
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.val === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    let updatedItem;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    }else {
      updatedItem = {
        ...existingItem, 
        amount: existingItem.amount -1,
      }
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  return initialCart;
}

const CartProvider = (props) => {

  const [cartState, dispatchCart] = useReducer(cartReducer, initialCart);
  //item argument is the object being passed from MealItem.js
  const addItemToCartHandler = (item) => {
    //We then pass object as item to the dispatchCart function to handle state
    dispatchCart({val:'ADD', item:item});
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCart({val:'REMOVE', id:id});
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