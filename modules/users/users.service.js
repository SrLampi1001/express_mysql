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
exports.getUserNameEmailAndOrdersNumber = async (id)=>{
    const user = await model.getUserNameEmailAndOrdersNumber(id);
    if(!user) throw new Error('User not found');
    return user;
}
exports.getUsersWithNoOrders = async ()=>{
    const users = await model.getUsersWithNoOrders();
    if(users.length === 0) throw new Error('No users found with no orders');
    return users;
}
exports.getTotalMoneySpentByUser = async (id)=>{
    const user = await model.getTotalMoneySpentByUser(id);
    if(!user) throw new Error('User not found');
    return user;
}
exports.getUsersFromCityWithOrders = async (city)=>{
    const users = await model.getUsersFromCityWithOrders(city);
    if(users.length === 0) throw new Error('No users found from this city with orders');
    return users;
}