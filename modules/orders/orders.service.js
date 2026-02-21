const model = require('./orders.model');
//The service only calls the model and returns the data, no business logic.
exports.getAllOrders = async ()=>{
    return await model.getAllOrders();
}
exports.getOrderById = async (id)=>{
    const order = await model.getOrderById(id);
    if(!order) throw new Error('Order not found');
    return order;
}
exports.getOrdersByUserId = async (userId)=>{
    const orders = await model.getOrdersByUserId(userId);
    if(orders.length === 0) throw new Error('No orders found for this user');
    return orders;
}
exports.getOrderByOrderNumber = async (orderNumber)=>{
    const order = await model.getOrderByOrderNumber(orderNumber);
    if(!order) throw new Error('Order not found');
    return order;
}
//Level 1 Assignment
exports.getAllOrdersWithUserEmail = async (email)=>{
    const orders = await model.getAllOrdersWithUserEmail(email);
    if(orders.length === 0) throw new Error('No orders found for this user');
    return orders;
}
exports.getCountOrdersByStatus = async ()=>{
    const count = await model.getCountOrdersByStatus();
    if(count.length === 0) throw new Error('No orders found');
    return count;
}
//Level 2 Assignment
exports.getOrdersReceipt = async ()=>{
    const receipts = await model.getOrdersReceipt();
    if(receipts.length === 0) throw new Error("No orders found")
    return receipts
}
exports.getOrderReceipt = async (id)=>{
    const receipt = await model.getOrderReceipt(id);
    if(!receipt) throw new Error("Order not found")
    return receipt;
}