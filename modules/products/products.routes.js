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

module.exports = router;