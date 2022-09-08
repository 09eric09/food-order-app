import React, {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
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

  const cartItems = <ul className={classes['cart-items']}> {cartItemsArray.map(item => 
  <CartItem 
    key={item.id} 
    name={item.name} 
    price={item.price} 
    amount={item.amount} 
    onRemove={cartItemRemoveHandler.bind(null, item.id)} 
    onAdd={cartItemAddHandler.bind(null, item)}>{item.name}
    </CartItem>)} </ul>;
  return (
    <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount </span>
            <span>{cartCtx.totalAmount.toFixed(2)}</span>
        </div> 
        {isCheckout && <Checkout onClose={props.onClose}/>}
        {!isCheckout &&<div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            {hasItems && <button onClick={showOrderForm} className={classes.button}>Order</button>}
        </div>}
    </Modal>
  )
}

export default Cart;