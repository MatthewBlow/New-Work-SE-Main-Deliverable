import CartContext from "./cart-context";
import { useReducer } from "react";

// Cart provider is where cart data is managed

// Object for the cart state
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Reducers always recieve a state object and a action object
// Action is dispatched by you
// State refers to last state snapshot of the state managed by the reducer
// useReducer() always needs a function to create the layout
// Concat is useful for providing a new array instead of editing an existing one in memory
// Current state being updated with a value from action

/*A*/ //Access to the current state snapshot
/*B*/ //Access to a property that was created with the dispatchCartAction function
/*C*/ /* Using .findIndex function to look through items array and returns the index of 
        the item in the array that is the same as the one we're trying to add (action.item). 
        In other words, checking if item exists in */
/*D*/ //.concat() adds a new item an array but doesn't edit existing array, returns new one

const cartReducer = (/*A*/ state, /*B*/ action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
      /*C*/ const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // Const to hold value of cart item at specific index
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    
    // IF statement for checking if an item already exists within the cart
    if(existingCartItem){
      //Set new item equal to the existing item and update amount values
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      // Add all state.items to a list 
      updatedItems = [...state.items];
      // Update item at specific index (existingCartItemIndex) with the updatedItem object 
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      //If item does not exist in the cart index then simply add it to the cart
      updatedItems = /*D*/ state.items.concat(action.item);
    }

    // Return updated information for the Cart Context
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE'){
    // Const to hold index of the item were trying to add to the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); 
    // Const to hold value of cart item at specific index
    const existingItem = state.items[existingCartItemIndex];
    // Const to hold value of removing the existing items price from the total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    
    let updatedItems;
    
    if(existingItem.amount === 1){
      // Using .filter to return a new array of items without the specified item (action.id)
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      // Updated item is equal to previous item but with new amount
      const updatedItem = {...existingItem, amount: existingItem.amount - 1}
      // Add all state.items to a list 
      // Update item at specific index (existingCartItemIndex) with the updatedItem object 
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem
    }
    
    // Return updated information for the Cart Context
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  //Cart object is then returned
  return defaultCartState;
};

/*A*/ // State snapshot
/*B*/ // Function to allow you to dispatch an action to reducer
/*C*/ // Pointing to the cartReducer function
/*D*/ // Initial state (Using the defaultCartState const)

const CartProvider = (props) => {
  const [/*A*/ cartState, /*B*/ dispatchCartAction] = useReducer(
    /*C*/ cartReducer,
    /*D*/ defaultCartState
  );

  /* Handler to use the dispatchCartAction to add a 'type' object and the value will be used in the reducer constant 
     with the 'action' parameter*/
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // Adding the cart objects dynamically with the cartState
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // CartConext (cart-context.js) used to provide auto complection logic
  // This 'Provider' is used to wrap a component and provide the context data
  // in this case it's providing the Cart data using the 'value' built in prop
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
