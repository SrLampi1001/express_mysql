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
exports.getCategoryTotalRevenue = async (categoryId) => {
    const revenue = await model.getCategoryTotalRevenue(categoryId);
    if(revenue.length === 0)throw new Error("No Category found with the given id")
    return revenue[0];
}
exports.getFiveBestSellingProducts = async () => {
    const products = await model.getFiveBestSellingProducts();
    if(products.length === 0) throw new Error("No products found");
    return products;
}
exports.getDailyRevenue = async () => {
    const revenue = await model.getDailyRevenue();
    if(revenue.length === 0) throw new Error("No revenue data found");
    return revenue;
}
exports.getCategoriesWithNoSales = async () => {
    const categories = await model.getCategoriesWithNoSales();
    if(categories.length === 0) throw new Error("No categories found with no sales");
    return categories;
}