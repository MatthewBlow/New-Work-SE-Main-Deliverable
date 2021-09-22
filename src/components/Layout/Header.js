import React, { Fragment } from 'react';
import classes from './Header.module.css';
import foodHeaderImg from '../../assets/F1.large.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return <Fragment>
      <header className={classes.header}>
          <h1>Food Order App</h1>
          <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
          <img src={foodHeaderImg} alt="A table full of food" />
      </div>
  </Fragment>
}

export default Header;