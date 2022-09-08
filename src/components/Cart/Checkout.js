import React from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const confirmHandler = (e) => {
        e.preventDefault();
        
    }

  return (
    <>
    <form onSubmit={confirmHandler}>
        <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id='name'/>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">Street</label>
            <input type="text" id='name'/>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">Postal Code</label>
            <input type="number" id='name'/>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">City</label>
            <input type="text" id='name'/>
        </div>
        <button>Confirm</button>
        <button onClick={props.onClose} type='button'>Cancel</button>
    </form>
    </>
  )
}

export default Checkout;