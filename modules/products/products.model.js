const db = require('../../config/db')
// Basic CRUD get all products, get product by id -> Not creating, updating or deleting product for this assignment
exports.getAllProducts = async ()=>{
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
}
exports.getProductById = async (id)=>{
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0]; // Return the first product found (or undefined if not found)
}
exports.getProductsByName = async (name)=>{
    const [rows] = await db.query('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`]);
    return rows; // Return all products found (or an empty array if not found)
}
exports.getProductsByCategoryId = async (categoryId)=>{
    const [rows] = await db.query('SELECT * FROM products WHERE category_id = ?', [categoryId]);
    return rows; // Return all products found (or an empty array if not found)
}
// Level 1 Assignment
exports.getProductsNameAndCategoryName = async ()=>{
    const [rows] = await db.query(`
        SELECT p.name AS Product_name, c.name AS Category_name
        FROM products p
        INNER JOIN categories c ON p.category_id = c.id
        ORDER BY Product_name ASC
    `);
    return rows; // Return all products with their category name (or an empty array if not found)
}
exports.getProductsByCategoryName = async (categoryName)=>{
    const [rows] = await db.query(`
        SELECT p.name AS Product_name, c.name AS Category_name
        FROM products p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE c.name LIKE ?
        ORDER BY Category_name ASC
    `, [`%${categoryName}%`]);
    return rows; // Return all products found for the category name (or an empty array if not found)
}
exports.getElectronicProducts = async ()=>{
    const [rows] = await db.query(`
        SELECT p.name AS Product_name, c.name AS Category_name
        FROM products p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE p.category_id  IN (1, 2, 3, 4, 5, 7) -- Assuming these IDs correspond to electronic products
        ORDER BY Category_name ASC
    `);
    return rows; // Return all electronic products (or an empty array if not found)
}
exports.getProductsByOrderNumber = async (orderNumber)=>{
    const [rows] = await db.query(`
        SELECT o.order_number AS Order_number, op.product_id AS Product_id, op.quantity AS Quantity
        FROM orders o 
        INNER JOIN order_product op ON o.id = op.order_id 
        WHERE o.order_number = ?
        ORDER BY o.order_number ASC
    `, [orderNumber]);
    return rows; // Return all products found for the order number (or an empty array if not found)
}
//Level 2 Assignment
exports.getProductsFromUserByName = async (userName)=>{
    const [rows] = await db.query(`
        SELECT u.name AS user_name, DISTINCT p.name AS product_name, 
        FROM users u
        INNER JOIN orders o ON u.id = o.user_id
        INNER JOIN order_product op ON o.id = op.order_id
        INNER JOIN products p ON op.product_id = p.id
        WHERE u.name LIKE ?
        ORDER BY user_name ASC
    `, [`%${userName}%`]);
    return rows; // Return all products found for the user name (or an empty array if not found)
}
exports.getProductsLastSaleDate = async ()=>{
    const [rows] = await db.query(`
        SELECT p.name AS product_name, MAX(op.created_at) AS last_sale_date
        FROM products p
        INNER JOIN order_product op ON p.id = op.product_id
        INNER JOIN orders o ON op.order_id = o.id
        GROUP BY p.id, p.name
        ORDER BY last_sale_date DESC
    `);
    return rows; // Return the last sale date for all products (or an empty array if not found)
}
exports.getProductLastSaleDate = async (productId)=>{
        const [rows] = await db.query(`
        SELECT p.name AS product_name, MAX(op.created_at) AS last_sale_date
        FROM products p
        INNER JOIN order_product op ON p.id = op.product_id
        INNER JOIN orders o ON op.order_id = o.id
        WHERE p.id = ?
        GROUP BY p.id, p.name
        ORDER BY last_sale_date DESC
    `, [productId]);
    return rows[0]; // Return the last sale date for the product (or undefined if not found)
}