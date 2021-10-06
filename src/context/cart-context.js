import React from "react";

// THIS DATA IS USED FOR BETTER AUTO COMPLETION, NOT FOR STORING VALUES
// Context values are stored in the context provider 
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

export default CartContext;