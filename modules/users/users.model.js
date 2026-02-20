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
