const db = require('../../config/db')
// Basic CRUD get all orders, get order by id -> Not creating, updating or deleting orders for this assignment
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
exports.getOrderByOrderNumber = async (orderNumber)=>{
    const [rows] = await db.query('SELECT * FROM orders WHERE order_number = ?', [orderNumber]);
    return rows[0]; // Return the first order found (or undefined if not found)
}
// Level 1 Assignment
exports.getAllOrdersWithUserEmail = async (email)=>{
    const [rows] = await db.query(`
        SELECT o.order_number, o.order_date, u.email 
        FROM orders o
        INNER JOIN users u ON o.user_id = u.id
        WHERE u.email = ?
    `, [email]);
    return rows; // Return all orders with user email (or an empty array if not found)
}
exports.getCountOrdersByStatus = async ()=>{
    const [rows] = await db.query(`
        SELECT status, COUNT(*) AS count
        FROM orders
        GROUP BY status
    `);
    return rows; // Return the count of orders by status (or an empty array if not found)
}
//Level 2 Assignment
exports.getOrdersReceipt = async ()=>{
    const [rows] = await db.query(`
        SELECT  o.order_number, o.order_date, p.name, p.sale_price AS Sale_price, p.purchase_price AS Purcharse_price, op.quantity AS Quantity
        FROM orders o 
        INNER JOIN order_product op ON o.id = op.order_id 
        INNER JOIN products p ON op.product_id = p.id 
        ORDER BY o.order_date ASC;
    `);
    return rows; //Returns a receipt of all orders (Or an empty array if not found)
}
exports.getOrderReceipt = async (id)=>{
    const[rows] = await db.query(`
        SELECT  o.order_number, o.order_date, p.name, p.sale_price AS Sale_price, p.purchase_price AS Purcharse_price, op.quantity AS Quantity
        FROM orders o 
        INNER JOIN order_product op ON o.id = op.order_id 
        INNER JOIN products p ON op.product_id = p.id 
        WHERE o.id = ?
        ORDER BY o.order_date ASC;
    `, [id]);
    return rows[0]; //Return the first order found (or undefined if not found)
}
