const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    flavor: String,
    weight: String,
    dateOfPurchase: Date,
    quantity: Number,
    price: Number,
    discount: Number,
    mrp: Number,
    dateOfExpiry: Date
});

const Product = new mongoose.model("Product", productSchema);

exports = module.exports = {Product};