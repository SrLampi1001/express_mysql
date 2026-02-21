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
    try{
        const {categoryId} = req.params;
        const revenue = await service.getCategoryTotalRevenue(categoryId);
        res.json(revenue)
    } catch (error){
        next(error);
    }
}
exports.getFiveBestSellingProducts = async (req, res, next)=>{
    try{
        const products = await service.getFiveBestSellingProducts();
        res.json(products);   
    } catch (error) {
        next(error);
    }
}
exports.getDailyRevenue = async (req, res, next)=>{
    try{
        const revenue = await service.getDailyRevenue();
        res.json(revenue);
    } catch (error) {
        next(error);
    }
}
exports.getCategoriesWithNoSales = async (req, res, next)=>{
    try{
        const categories = await service.getCategoriesWithNoSales();
        res.json(categories);
    } catch (error) {
        next(error);
    }
}