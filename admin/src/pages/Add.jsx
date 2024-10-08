import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { assets } from "../assets/assets";
import { backendUrl } from "../App";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSizeToggle = (size) => {
    setSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const handleImageChange = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // Save the file itself
      setImages(newImages);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate inputs here
    if (!name || !description || !price || !images[0]) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });
    try {
      const response = await axios.post(`/api/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Success:", response.data);
      // Optionally reset form here
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setBestseller(false);
      setSizes([]);
      setImages([null, null, null, null]); // Reset image states
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "There was an error adding the product. Please try again."
      );
    }
  };

  // Clean up URLs for memory leaks
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload"
              />
              <input
                onChange={handleImageChange(index)}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0" // Prevent negative numbers
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size}>
              <p
                className={`bg-slate-200 px-3 py-1 cursor-pointer ${
                  sizes.includes(size) ? "bg-blue-300" : ""
                }`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
