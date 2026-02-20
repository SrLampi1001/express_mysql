const model = require('./products.model');
//The service only calls the model and returns the data, no business logic.
exports.getAllProducts = async ()=>{
    return await model.getAllProducts();
} 
exports.getProductById = async (id)=>{
    const product = await model.getProductById(id);
    if(!product) throw new Error('Product not found');
    return product;
}
exports.getProductsByName = async (name)=>{
    const products = await model.getProductsByName(name);
    if(products.length === 0) throw new Error('No products found with this name');
    return products;
}
exports.getProductsByCategoryId = async (categoryId)=>{
    const products = await model.getProductsByCategoryId(categoryId);
    if(products.length === 0) throw new Error('No products found for this category');
    return products;
}
exports.getProductsNameAndCategoryName = async ()=>{
    const products = await model.getProductsNameAndCategoryName();
    if(products.length === 0) throw new Error('No products found');
    return products;
}
exports.getProductsByCategoryName = async (categoryName)=>{
    const products = await model.getProductsByCategoryName(categoryName);
    if(products.length === 0) throw new Error('No products found for this category name');
    return products;
}
exports.getElectronicProducts = async ()=>{
    const products = await model.getElectronicProducts();
    if(products.length === 0) throw new Error('No electronic products found');
    return products;
}
exports.getProductsByOrderNumber = async (orderNumber)=>{
    const products = await model.getProductsByOrderNumber(orderNumber);
    if(products.length === 0) throw new Error('No products found for this order number');
    return products;
}
