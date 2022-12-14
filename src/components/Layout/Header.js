import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
    <header className={classes.header}>
        <h1>Acme Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
        <img src={mealsImage} alt="Yummy Food!"/>
    </div>
    </>
  )
}

export default Header;