import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create a new context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Add item to cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    setCartItems((prevItems) => {
      const newItems = { ...prevItems };

      if (newItems[itemId]) {
        if (newItems[itemId][size]) {
          newItems[itemId][size] += 1;
        } else {
          newItems[itemId][size] = 1;
        }
      } else {
        newItems[itemId] = { [size]: 1 };
      }

      return newItems;
    });

    // Navigate to cart page after adding an item
    navigate("/cart");
  };

  // Update quantity of a specific item in cart
  const updateCart = (id, size, quantity) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };

      if (quantity === 0) {
        delete newItems[id][size];
        if (Object.keys(newItems[id]).length === 0) {
          delete newItems[id];
        }
      } else {
        newItems[id] = { ...newItems[id], [size]: quantity };
      }

      return newItems;
    });
  };

  // Remove an item from the cart
  const removeItem = (itemId, size) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[itemId]) {
        delete newItems[itemId][size];
        if (Object.keys(newItems[itemId]).length === 0) {
          delete newItems[itemId];
        }
      }

      // Navigate to home page if cart is empty after removing the item
      if (Object.keys(newItems).length === 0) {
        navigate("/");
      }

      return newItems;
    });
  };

  // Get the total number of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((totalCount, sizes) => {
      return (
        totalCount + Object.values(sizes).reduce((sum, count) => sum + count, 0)
      );
    }, 0);
  };

  // Get total amount in the cart
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId of Object.keys(cartItems)) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        const sizes = cartItems[itemId];
        for (const size in sizes) {
          const quantity = sizes[size];
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  // Monitor cart changes for debugging
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // Context value containing products, currency, and delivery fee
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateCart,
    removeItem,
    getCartCount,
    getCartAmount,
    navigate, // Making navigate available in context if needed by other components
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
