import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`/api/product/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "There was an error fetching the list. Please try again."
      );
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`/api/product/delete`, {
        id,
      });
      if (response.data.success) {
        fetchList();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      alert(
        error.response?.data?.message ||
          "There was an error deleting the product. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div>
        {/* List Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div className="text-center">Action</div>
        </div>

        {/* Display the list of products */}
        {list.length === 0 ? (
          <p>No products available.</p>
        ) : (
          list.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <div>{product.name}</div>
              <div>{product.category}</div>
              <div>{product.price}</div>
              <div className="flex justify-center">
                <button className="text-blue-500 mr-2">Edit</button>
                <button
                  className="text-red-500"
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this product?"
                    );
                    if (confirmDelete) {
                      removeProduct(product.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
