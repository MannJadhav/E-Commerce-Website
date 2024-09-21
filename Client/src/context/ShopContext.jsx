import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";

// Create a new context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

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

  // Update the quantity of a specific item directly (alternative method)
  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };

      if (newItems[itemId]) {
        if (quantity === 0) {
          delete newItems[itemId][size];
          if (Object.keys(newItems[itemId]).length === 0) {
            delete newItems[itemId];
          }
        } else {
          newItems[itemId][size] = quantity;
        }
      }

      return newItems;
    });
  };

  const getCartAmount = async () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const handleRemoveItem = (item) => {
    removeItem(item._id, item.size); // Calls the removeItem function from context
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
    removeItem, // Adding removeItem to the context
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
