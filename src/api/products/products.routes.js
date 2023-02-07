const ProductRoutes = require('express').Router();
const { postNewProduct, getAllProduct, getProduct, patchProduct, deleteProduct } = require('./products.controller');
const { isUser, isAdmin, isRegistered }= require("../../middlewares/auth");

ProductRoutes.get('/', getAllProduct);
ProductRoutes.get('/:id', getProduct);
ProductRoutes.post('/', postNewProduct);
ProductRoutes.patch('/:id', patchProduct);
ProductRoutes.delete('/:id', deleteProduct);

module.exports = ProductRoutes