const service = require('./reports.service');
exports.getAvgUsersOrderValue = async (req, res, next)=>{
    try {
        const result = await service.getAvgUsersOrderValue();
        res.json(result);
    } catch (error) {
        next(error);
    }
}
