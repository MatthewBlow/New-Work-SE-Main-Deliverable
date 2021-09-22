import React from "react";
import classes from "./Input.module.css";

// props.input is an object which holds confirguration data (attributes) for the input
// Using spread operator {...props.input} to add all the confirguration data to the <input> element

// .fowardRef and the ref prop is how we add the built in ref prop to a custom component
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
