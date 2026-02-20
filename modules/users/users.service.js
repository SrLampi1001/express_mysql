const model = require('./users.model');
//The service only calls the model and returns the data, no business logic.
exports.getAllUsers = async ()=>{
    return await model.getAllUsers();
}
exports.getUserById = async (id)=>{
    const user = await model.getUserById(id);
    if(!user) throw new Error('User not found'); // If no user is found, throw an error to be handled by the error middleware
    return user;
}
exports.getUserByEmail = async (email)=>{
    const user = await model.getUserByEmail(email);
    if(!user) throw new Error('User not found'); // If no user is found, throw an error to be handled by the error middleware
    return user;
}