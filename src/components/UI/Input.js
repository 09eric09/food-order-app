import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    {/* using spread operator which sets all the attributes passed in 
    from props in MealItemForm.js, totally customizable */}
    <input {...props.input}/>
    </div>
    
  )
}

export default Input;