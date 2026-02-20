const ordersService = require('./orders.service'); // Import the service layer for orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await ordersService.getAllOrders(); // Call the service to get all orders
    res.json(orders); // Send the orders as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await ordersService.getOrderById(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};
exports.getOrdersByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await ordersService.getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
exports.getOrdersByOrderNumber = async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const order = await ordersService.getOrdersByOrderNumber(orderNumber);
    res.json(order);
  } catch (error) {
    next(error);
  }
};