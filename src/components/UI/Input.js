import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    {/* using spread operator which sets all the attributes passed in 
    from input prop object in MealItemForm.js, totally customizable */}
    <input ref={ref} {...props.input}/>
    </div>
    
  )
})

export default Input;