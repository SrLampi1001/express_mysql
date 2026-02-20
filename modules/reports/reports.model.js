const db = require('../../config/db')
// Basic CRUD get all products, get product by id -> Not creating, updating or deleting products for this assignment
exports.getAvgUsersOrderValue = async () => {
    const [rows] = await db.query(`
        SELECT u.name, AVG(total) AS avg_order_value, COUNT(o.id) AS total_orders
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        GROUP BY u.id
        ORDER BY avg_order_value DESC
    `);
    return rows; // Return the average order value for each user (or an empty array if not found)
}