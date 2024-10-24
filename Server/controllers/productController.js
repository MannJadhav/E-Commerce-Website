import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import { json } from "express";

// function for adding product
const addProduct = async (req, res) => {
    try {
        // Destructure the product details from req.body
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        // Extract the uploaded images
        const image1 = req.files.image1; // Single file for image1
        const image2 = req.files.image2; // Single file for image2
        const image3 = req.files.image3; // Single file for image3
        const image4 = req.files.image4; // Single file for image4

        // Only keep valid images
        const images = [image1, image2, image3, image4].filter(
            (item) => item !== undefined
        );

        console.log(images);

        let imagesUrl = await Promise.all(
            images[0].map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );
        console.log(sizes);
        // Prepare the product data to be saved
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: sizes, // Parse the sizes string into JSON
            image: imagesUrl, // Array of image URLs
            date: Date.now(),
        };
        // Create a new product using the product model
        const product = new productModel(productData);
        await product.save(); // Save the product to the database
        // Send success response
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        // Send error response
        res.json({ success: false, message: error.message });
    }
};

// function for listing products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for removing a product
const removeProduct = async (req, res) => {
    try {
        console.log(req.body);

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for fetching single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct };
