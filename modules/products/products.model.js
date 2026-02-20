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