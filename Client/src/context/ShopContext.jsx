import { createContext } from "react";
import { products } from "../assets/assets.js"; // Ensure products are correctly exported from this path

// Create a new context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹'; 
    const delivery_fee = 10;

    // Context value containing products, currency, and delivery fee
    const value = {
        products, 
        currency, 
        delivery_fee
    };

    return (
        <ShopContext.Provider value={value}>
           {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
