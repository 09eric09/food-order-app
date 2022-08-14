import React, {useContext} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);  
  let cartItemsArray = cartCtx.items;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {} 
  const cartItemAddHandler = (item) => {} 

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
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart;