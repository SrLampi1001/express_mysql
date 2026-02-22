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
exports.getFiveBestSellingProducts = async () => {
    const [rows] = await db.query(`
        SELECT p.name, SUM(op.quantity) AS total_sold
        FROM products p
        INNER JOIN order_product op ON p.id = op.product_id
        GROUP BY p.id, p.name
        ORDER BY total_sold DESC
        LIMIT 5;
    `);
    return rows; // Return the five best-selling products (or an empty array if not found)
}
exports.getDailyRevenue = async () => {
    const [rows] = await db.query(`
        SELECT DATE(o.created_at) AS date, SUM(o.total) AS daily_revenue
        FROM orders o
        GROUP BY DATE(o.created_at)
        ORDER BY date ASC;
    `);
    return rows; // Return the daily revenue (or an empty array if not found)
}
exports.getCategoriesWithNoSales = async () => {
    const [rows] = await db.query(`
        SELECT c.name AS Category_name
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id
        LEFT JOIN order_product op ON op.product_id = p.id
        WHERE op.id IS NULL
        GROUP BY c.id, c.name
        ORDER BY c.name ASC;
    `);
    return rows; // Return all categories with no sales (or an empty array if not found)
}
//Level 3 Assignment
exports.getGlobalReports = async () => {
    const [rows] = await db.query(`
        SELECT u.id, u.name, u.city, o.order_number, p.name AS name_product, c.name AS Category, op.quantity, (op.price_at_purchase * op.quantity) AS subtotal_item 
        FROM users u 
        LEFT JOIN orders o  ON o.user_id = u.id 
        LEFT JOIN order_product op ON op.order_id  = o.id 
        LEFT JOIN products p ON p.id = op.product_id 
        LEFT JOIN categories c ON c.id = p.category_id 
        ORDER BY u.id ASC;
        `);
    return rows; // Return a global report with all the data (or an empty array if not found)
}
exports.getCitiesRevenueFromClothesCategory = async () => {
    const [rows] = await db.query(`
       SELECT u.city AS City_name, c.name AS Category, SUM(op.price_at_purchase * op.quantity) AS products_total_revenue 
        FROM categories c 
        INNER JOIN products p ON c.id = p.category_id 
        INNER JOIN order_product op ON op.product_id = p.id 
        INNER JOIN orders o ON o.id = op.order_id
        INNER JOIN users u ON u.id = o.user_id
        WHERE c.id = 6  -- Assuming this ID correspond to clothes category
        GROUP BY u.city`);
    return rows; // Return the total revenue from the "Clothes" category for each city (or an empty array if not found)
}
exports.getCityRevenueFromClothesCategory = async (city) => {
    const [rows] = await db.query(`
        SELECT u.city AS City_name, c.name AS Category, SUM(op.price_at_purchase * op.quantity) AS products_total_revenue
        FROM categories c
        INNER JOIN products p ON c.id = p.category_id
        INNER JOIN order_product op ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        INNER JOIN users u ON u.id = o.user_id
        WHERE c.id = 6 AND u.city = ?`, [city]);
    return rows[0]; // Return the total revenue from the "Clothes" category for the city (or undefined if not found)
}
exports.getTotalProfit = async () => {
    const [rows] = await db.query(`
        SELECT SUM((op.price_at_purchase - p.purchase_price) * op.quantity) AS total_profit
        FROM order_product op
        INNER JOIN products p ON op.product_id = p.id
    `);
    return rows[0]; // Return the total profit (or undefined if not found)
}
exports.getThreeMostProfitableCities = async () => {
    const [rows] = await db.query(`
        SELECT u.city AS City_name, SUM((op.price_at_purchase - p.purchase_price) * op.quantity) AS total_profit
        FROM order_product op
        INNER JOIN products p ON op.product_id = p.id
        INNER JOIN orders o ON o.id = op.order_id
        INNER JOIN users u ON u.id = o.user_id
        GROUP BY u.city
        ORDER BY total_profit DESC
        LIMIT 3;
    `);
    return rows; // Return the three most profitable cities (or an empty array if not found)
}