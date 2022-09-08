import React, {useState} from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [nameInput, setNameInput] = useState('');
    const [streetInput, setStreetInput] = useState('');
    const [postalInput, setPostalInput] = useState('');
    const [cityInput, setCityInput] = useState('');

    const confirmHandler = (e) => {
        e.preventDefault();

        let orderInfo = {
            name: nameInput,
            street: streetInput,
            postal: postalInput,
            city: cityInput,
        }

        console.log(orderInfo);
    }

  return (
    <>
    <form onSubmit={confirmHandler}>
        <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input onChange={(e)=> setNameInput(e.target.value)} type="text" id='name' value={nameInput}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">Street</label>
            <input onChange={(e)=> setStreetInput(e.target.value)} type="text" id='name' value={streetInput}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">Postal Code</label>
            <input onChange={(e)=> setPostalInput(e.target.value)} type="number" id='name' value={postalInput}/>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">City</label>
            <input onChange={(e)=> setCityInput(e.target.value)} type="text" id='name' value={cityInput}/>
        </div>
        <div className={classes.actions}>
        <button>Confirm</button>
        <button onClick={props.onClose} type='button'>Cancel</button>
        </div>
    </form>
    </>
  )
}

export default Checkout;