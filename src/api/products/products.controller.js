const Product = require("./products.model");

const postNewProduct = async (req, res, next) => {
    try {
      const newProduct = new Product(req.body);
      const productDB = await newProduct.save();
      return res.status(201).json(productDB);
    } catch (error) {
      return next(error);
    }
  };

  const getAllProduct = async (req, res, next) => {
    try {
      const productDB = await Product.find();
      return res.status(200).json(productDB);
    } catch (error) {
      return next(setError(404, "Product server fail"));
    }
  };
  
  const getProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productDB = await Product.findById(id);
      if (!productDB) {
        return next(setError(404, "Product not found"));
      }
      return res.status(200).json(productDB);
    } catch (error) {
      return next(setError(404, "Product server fail"));
    }
  };
  
  const patchProduct = async (req, res, next) => {
      try {
        const { id } = req.params;
        const patchProduct = new Product(req.body);
        patchProduct._id = id;
        const ProductDB = await Product.findById(id);
        const ProductUpdated = await Product.findByIdAndUpdate(id, patchProduct);
        if (!ProductDB) {
          return next(setError(404, "Product not found"));
        }
        return res.status(200).json({ new: patchProduct, old: ProductUpdated });
      } catch (error) {
        return next(setError(500, "Product cant be replaced"));
      }
    };
  
  const deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productDB = await Product.findOneAndDelete({ id: id });
      if (!productDB) {
        return next(setError(404, "Error borrando product"));
      }
      return res.status(200).json(productDB);
    } catch (error) {
      return next(setError(500, "Product no se puede borrar"));
    }
  };
  
  module.exports = {
    postNewProduct,
    getAllProduct,
    deleteProduct,
    getProduct,
    patchProduct
  };