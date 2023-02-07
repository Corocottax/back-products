const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    imagen: { type: String, trim: true, required: true },
    precio: { type: Number, trim: true, required: true },
  },
  { timestamps: true, collection: "products" }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
