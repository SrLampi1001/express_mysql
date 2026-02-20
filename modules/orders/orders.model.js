const db = require('../../config/db')
// Basic CRUD get all orders, get user by id -> Not creating, updating or deleting orders for this assignment
exports.getAllOrders = async ()=>{
    const [rows] = await db.query('SELECT * FROM orders');
    return rows;
}
exports.getOrderById = async (id)=>{
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0]; // Return the first order found (or undefined if not found)
}
exports.getOrdersByUserId = async (userId)=>{
    const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
    return rows; // Return all orders for the user (or an empty array if not found)
}
exports.getOrdersByOrderNumber = async (orderNumber)=>{
    const [rows] = await db.query('SELECT * FROM orders WHERE order_number = ?', [orderNumber]);
    return rows[0]; // Return the first order found (or undefined if not found)
}