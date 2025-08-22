// server/controllers/productController.js

const Product = require('../models/Product.js');
const User = require('../models/User.js');

const getAllProducts = async (req, res) => {
    try {
        let query = Product.find({});

        // If a 'limit' is provided in the URL query string, apply it
        if (req.query.limit) {
            query = query.limit(parseInt(req.query.limit));
        }

        const allProducts = await query.sort({ createdAt: -1 }); // Sort by newest
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while finding all products", error });
    }
};

const getProductById = async (req, res) => {
    try {
        const singleProduct = await Product.findById(req.params.id);
        if (!singleProduct) {
            return res.status(404).json({ message: "Product not found with that ID" });
        }
        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while finding one product", error });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: "Validation error creating product", error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found with that ID" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Validation error updating product", error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(4404).json({ message: "Product not found with that ID" });
        }
        res.status(200).json({ message: "Product successfully deleted", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while deleting the product", error });
    }
};
const getDashboardStats = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        // In the future, you could add:
        // const orderCount = await Order.countDocuments();
        // const totalSales = await Order.aggregate([...]);
        
        const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            productCount,
            userCount,
            recentProducts
        });
    } catch (error) {
        res.status(500).json({ message: "Could not fetch dashboard stats", error });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getDashboardStats
};