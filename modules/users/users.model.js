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
//Level 3 Assignment
exports.getYearBestCustomer = async () => {
    const [rows] = await db.query(`
        SELECT u.name, u.email, SUM(o.total) AS total_spent
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        WHERE YEAR(o.created_at) = YEAR(CURDATE())
        GROUP BY u.id, u.name, u.email
        ORDER BY total_spent DESC
        LIMIT 1;
    `);
    return rows[0]; // Return the best customer of the year (or undefined if not found)
}
exports.getUsersWithGamingProductsButNoHomeProducts = async () => {
    const [rows] = await db.query(`
        SELECT DISTINCT u.name, u.email, c.name AS Category 
        FROM users u 
        INNER JOIN orders o ON o.user_id = u.id 
        INNER JOIN order_product op ON op.order_id = o.id 
        INNER JOIN products p ON p.id = op.product_id 
        INNER JOIN categories c ON c.id = p.category_id 
        WHERE c.id = 4 AND u.id NOT IN -- Assuming category id 4 corresponds to gaming products 
        (SELECT u2.id 
        FROM users u2 
        INNER JOIN orders o2 ON o2.user_id = u2.id 
        INNER JOIN order_product op2 ON op2.order_id = o2.id 
        INNER JOIN products p2 ON p2.id = op2.product_id 
        INNER JOIN categories c2 ON c2.id = p2.category_id 
        WHERE c2.id = 7) -- Assuming category id 7 corresponds to home products
        ORDER BY u.name ASC;`
    );
    return rows; // Return all users with gaming products but no home products (or an empty array if not found)
}