import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

// Helper functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 4;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confrimHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        city: enteredCity,
        postalCode: enteredPostal
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;

  const addressControlClasses = `${classes.control} ${
    formInputsValidity.address ? '' : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form onSubmit={confrimHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
