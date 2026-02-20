const express = require('express');
const router = express.Router();
const ordersController = require('./orders.controller');
const usersLoggerMiddleware = require('../../middlewares/orders.middleware'); // Middleware to log access to user routes
// Apply the logger middleware to all routes in this router
router.use(usersLoggerMiddleware);
router.get('/', ordersController.getAllOrders);

router.get('/:id', ordersController.getOrderById);
router.get('/user/:userId', ordersController.getOrdersByUserId);
router.get('/orderNumber/:orderNumber', ordersController.getOrdersByOrderNumber);

module.exports = router;