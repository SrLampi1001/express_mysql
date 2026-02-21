const db = require('../../config/db')
// Basic CRUD get all users, get user by id -> Not creating, updating or deleting users for this assignment
exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users'); 
    return rows;
}
exports.getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]); 
    return rows[0]; // Return the first user found (or undefined if not found)
}
exports.getUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]); 
    return rows[0]; // Return the first user found (or undefined if not found)
}
// Level 1 Assignment
exports.getUserNameEmailAndOrdersNumber = async (id) => {
    const [rows] = await db.query(`
        SELECT u.name, u.email, o.order_number
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        WHERE u.id = ?
    `, [id]);
    return rows; // Return the orders number from user found (or undefined if not found)
}
exports.getUsersWithNoOrders = async () => {
    const [rows] = await db.query(`
        SELECT u.name, u.email
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        WHERE o.user_id IS NULL
    `);
    return rows; // Return all users with no orders (or an empty array if not found)
}
exports.getTotalMoneySpentByUser = async (id) => {
    const [rows] = await db.query(`
        SELECT u.name, u.email, SUM(o.total) AS total_spent
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        WHERE u.id = ?
        GROUP BY u.id
    `, [id]);
    return rows[0]; // Return the total money spent by user found (or undefined if not found)
}
exports.getUsersFromCityWithOrders = async (city) => {
    const [rows] = await db.query(`
        SELECT u.city, u.name, u.email, count(*) AS orders_count
        FROM users u
        RIGHT JOIN orders o ON u.id = o.user_id
        WHERE u.city = ?
        GROUP BY u.id
        ORDER BY orders_count DESC
    `, [city]);
    return rows; // Return all users from the city with orders (or an empty array if not found)
}
//Level 2 Assignment
exports.getUsersWithGamerProducts = async () => {
    const [rows] = await db.query(`
        SELECT DISTINCT u.name
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        INNER JOIN order_product op ON o.id = op.order_id
        INNER JOIN products p ON op.product_id = p.id
        WHERE p.name LIKE '%gamer%'
        ORDER BY u.name ASC
    `);
    return rows; // Return all users with gamer products (or an empty array if not found)
}
exports.getUsersAverageOrderValue = async () => {
    const [rows] = await db.query(`
        SELECT u.name, AVG(o.total) AS avg_order_value
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        GROUP BY u.id, u.name
        ORDER BY avg_order_value DESC
    `);
    return rows; // Return the average order value for each user (or an empty array if not found)
}
exports.getUserAverageOrderValue = async (id) => {
    const [rows] = await db.query(`
        SELECT u.name, AVG(o.total) AS avg_order_value
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        WHERE u.id = ?
        GROUP BY u.id, u.name
        ORDER BY avg_order_value DESC
    `, [id]);
    return rows[0]; // Return the average order value for the user (or undefined if not found)
}