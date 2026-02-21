const model = require('./reports.model');
//The service only calls the model and returns the data, no business logic.
//Level 1 Assignment
exports.getAvgUsersOrderValue = async ()=>{
    return await model.getAvgUsersOrderValue();
}
//Level 2 Assignment
exports.getCategoriesTotalRevenue = async ()=> {
    const revenues = await model.getCategoriesTotalRevenue();
    if(revenues.length === 0)throw new Error("No Categories found")
    return revenues;
}