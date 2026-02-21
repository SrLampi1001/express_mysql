const service = require('./reports.service');
//Level 1 Assignment
exports.getAvgUsersOrderValue = async (req, res, next)=>{
    try {
        const result = await service.getAvgUsersOrderValue();
        res.json(result);
    } catch (error) {
        next(error);
    }
}
//Level 2 Assignment
exports.getCategoriesTotalRevenue = async (req, res, next)=>{
    try{
        const revenues = await service.getCategoriesTotalRevenue();
        res.json(revenues)
    } catch (error){
        next(error);
    }
}
exports.getCategoryTotalRevenue = async (req, res, next)=>{
    
}