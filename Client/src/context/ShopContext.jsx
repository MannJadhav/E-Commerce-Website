import { createContext } from "react";
import { products } from "../assets/assets"; // Ensure products are correctly exported from this path

// Create a new context
export const shopContext = createContext();

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
        <shopContext.Provider value={value}>
           {props.children}
        </shopContext.Provider>
    );
};

export default ShopContextProvider;
