import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  console.log(name);

  return (
    <>
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image} // Ensure this is a valid image URL
            alt={name} // Descriptive alt text for accessibility
            className="hover:scale-110 transition ease-in-out duration-200 p-4" // Added padding
            onError={(e) => {
              e.target.src = "fallback-image-url.jpg"; // Fallback image URL
            }}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </>
  );
};

export default ProductItem;
