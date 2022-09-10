import React, {useState} from 'react';
import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim().length > 1;
const isFiveDigits = value => value.trim().length === 5; 

const Checkout = (props) => {
    const [nameInput, setNameInput] = useState('');
    const [streetInput, setStreetInput] = useState('');
    const [postalInput, setPostalInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [formIsValidObject, setFormIsValidObject] = useState({name:true,street:true,postal:true,city:true});

    const confirmHandler = (e) => {
        e.preventDefault();

        const nameInputIsValid = isNotEmpty(nameInput);
        const streetInputIsValid = isNotEmpty(streetInput);
        const postalInputIsValid = isFiveDigits(postalInput);
        const cityInputIsValid = isNotEmpty(cityInput);

        setFormIsValidObject({
            name: nameInputIsValid,
            street: streetInputIsValid,
            postal: postalInputIsValid,
            city: cityInputIsValid,
        });

        const formIsValid = nameInputIsValid && streetInputIsValid && postalInputIsValid && cityInputIsValid;

        if (!formIsValid) {
           return; 
        }

        props.onConfirm({
            name: nameInput, 
            street: streetInput, 
            postal: postalInput,
            city: cityInput,
        });
    }

  return (
    <>
    <form onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formIsValidObject.name ? '' : classes.invalid}`}>
            <label htmlFor="name">Your Name</label>
            <input onChange={(e)=> setNameInput(e.target.value)} type="text" id='name' value={nameInput}/>
            {!formIsValidObject.name && <p>Please Enter a Valid Name...</p>}
        </div>
        <div className={`${classes.control} ${formIsValidObject.street ? '' : classes.invalid}`}>
            <label htmlFor="name">Street</label>
            <input onChange={(e)=> setStreetInput(e.target.value)} type="text" id='name' value={streetInput}/>
            {!formIsValidObject.street && <p>Please Enter a Valid Street...</p>}
        </div>
        <div className={`${classes.control} ${formIsValidObject.postal ? '' : classes.invalid}`}>
            <label htmlFor="name">Postal Code</label>
            <input onChange={(e)=> setPostalInput(e.target.value)} type="number" id='name' value={postalInput}/>
            {!formIsValidObject.postal && <p>Please Enter a Valid Zip Code...</p>}
        </div>
        <div className={`${classes.control} ${formIsValidObject.city ? '' : classes.invalid}`}>
            <label htmlFor="name">City</label>
            <input onChange={(e)=> setCityInput(e.target.value)} type="text" id='name' value={cityInput}/>
            {!formIsValidObject.city && <p>Please Enter a Valid City</p>}
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