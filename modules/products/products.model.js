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