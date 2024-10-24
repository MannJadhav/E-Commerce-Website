import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create a new context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // Add item to cart (async function)
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = JSON.parse(JSON.stringify(cartItems)); // Fallback for structuredClone

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update the cart in local state
    setCartItems(cartData);

    if (token) {
      try {
        // Send updated cart data to the server
        await axios.post(
          `/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Product added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to add item to cart");
      }
    }

    // Navigate to cart page after adding an item (if desired)
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

  // Fetch products data
  const getProductsData = async () => {
    try {
      const response = await axios.get(`/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get user's cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartItems);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch cart");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else if (localStorage.getItem("token")) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      getUserCart(storedToken); // Fetch cart after setting token
    }
  }, [token]);

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
    setCartItems,
    updateCart,
    removeItem,
    getCartCount,
    getCartAmount,
    navigate,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
