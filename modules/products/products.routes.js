const express = require('express');
const router = express.Router();
const productsController = require('./products.controller');
const productsLoggerMiddleware = require('../../middlewares/products.middleware');
// Apply the logger middleware to all routes in this router
router.use(productsLoggerMiddleware);
router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);
router.get('/name/:name', productsController.getProductsByName);
router.get('/category/:categoryId', productsController.getProductsByCategoryId);
router.get('/nameAndCategory', productsController.getProductsNameAndCategoryName);
//Level 1 Assignment
router.get('/categoryName/:categoryName', productsController.getProductsByCategoryName);
router.get('/electronic', productsController.getElectronicProducts);
router.get('/orderNumber/:orderNumber', productsController.getProductsByOrderNumber);
//Level 2 Assignment
router.get('/userName/:userName', productsController.getProductsFromUserByName);
router.get('/lastSaleDate', productsController.getProductsLastSaleDate);
router.get('/lastSaleDate/:productId', productsController.getProductLastSaleDate);
//Level 3 Assignment
module.exports = router;