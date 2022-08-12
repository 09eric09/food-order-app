import React, {useContext} from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCTX = useContext(CartContext);
  // const price = `$${props.price.toFixed(2)}`;
  const onAddToCartHandler = (amount) => {
    let newItem = {
      id: props.id,
      name: props.meal.name,
      price: props.meal.price,
      description: props.meal.description,
      amount: amount,
    }
    cartCTX.addItem(newItem);
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{props.meal.price}</div>
      </div>
      <div>
        <MealItemForm onAddTocart={onAddToCartHandler}/>
      </div>
    </li>
  )
}

export default MealItem;