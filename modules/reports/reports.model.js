const db = require('../../config/db')
// Level 1 Assignment
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
//Level 2 Assignment
exports.getCategoriesTotalRevenue = async () => {
    const [rows] = await db.query(`
        SELECT c.name, SUM(op.price_at_purchase * op.quantity) AS ingreso_total 
        FROM categories c 
        INNER JOIN products p ON p.category_id = c.id 
        INNER JOIN order_product op ON op.product_id = p.id 
        GROUP BY c.id, c.name 
        ORDER BY ingreso_total DESC;
    `);
    return rows; // Return the total revenue for each product category (or an empty array if not found)
}
exports.getCategoryTotalRevenue = async (category_id) => {
    const [rows] =  await db.query(`
        SELECT c.name, SUM(op.price_at_purchase * op.quantity) AS ingreso_total 
        FROM categories c 
        INNER JOIN products p ON p.category_id = c.id 
        INNER JOIN order_product op ON op.product_id = p.id 
        WHERE c.id = ?
        GROUP BY c.id, c.name
    `, [category_id]);
    return rows[0]; //Return the first category (or undefined if not found)
}