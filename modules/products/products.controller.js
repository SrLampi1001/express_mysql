const service = require('./products.service');
exports.getAllProducts = async (req, res, next)=>{
    try {
        const products = await service.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
}
exports.getProductById = async (req, res, next)=>{
    try {
        const { id } = req.params;
        const product = await service.getProductById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
}
exports.getProductsByName = async (req, res, next)=>{
    try {
        const { name } = req.params;
        const products = await service.getProductsByName(name);
        res.json(products);
    } catch (error) {
        next(error);
    }
}
exports.getProductsByCategoryId = async (req, res, next)=>{
    try {
        const { categoryId } = req.params;
        const products = await service.getProductsByCategoryId(categoryId);
        res.json(products);
    } catch (error) {
        next(error);
    }
}