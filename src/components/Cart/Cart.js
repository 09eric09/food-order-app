import React, {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);  
  const hasItems = cartCtx.items.length > 0;
  let cartItemsArray = cartCtx.items;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  } 
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  } 

  const showOrderForm = () => {
    setIsCheckout(true);
  }

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(`https://food-order-app-2e7ec-default-rtdb.firebaseio.com/orders.json`, {
      method: 'POST', 
      body: JSON.stringify({
        userData: userData,
        orderedItems: cartItemsArray,
      })
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  }

  const cartItems = <ul className={classes['cart-items']}> {cartItemsArray.map(item => 
  <CartItem 
    key={item.id} 
    name={item.name} 
    price={item.price} 
    amount={item.amount} 
    onRemove={cartItemRemoveHandler.bind(null, item.id)} 
    onAdd={cartItemAddHandler.bind(null, item)}>{item.name}
    </CartItem>)} </ul>;

    const cartModalContent = <>
      {cartItems}
      <div className={classes.total}>
          <span>Total Amount </span>
          <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div> 
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onClose={props.onClose}/>}
      {!isCheckout &&<div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        {hasItems && <button onClick={showOrderForm} className={classes.button}>Order</button>}
      </div>}
    </>;

    const isSubmittingContent = <p>Submitting...</p>;
    const isSubmittedContent = <>
    <p>Your order has been placed!</p>
    <button onClick={props.onClose} className={classes.button}>Close</button>
    </>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && isSubmitted && isSubmittedContent}
    </Modal>
  )
}

export default Cart;