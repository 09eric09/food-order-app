import React, {useRef, useState} from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    //this is received from Input.js as a ref
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setIsValid(false);
      return;
    }
    props.onAddTocart(enteredAmountNumber);
  }

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <Input ref={amountInputRef} label={'Amount'} input={{
        type: 'number',
        id: 'amount_' + props.id, // this changed!
        defaultValue: '1',
      }}/>
      <button>+ Add</button>
      {!isValid && <p>Please Enter a Valid Amount</p>}
    </form>
  )
}

export default MealItemForm;