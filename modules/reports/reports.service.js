const model = require('./reports.model');
//The service only calls the model and returns the data, no business logic.
exports.getAvgUsersOrderValue = async ()=>{
    return await model.getAvgUsersOrderValue();
}
