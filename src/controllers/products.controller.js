import createError from 'http-errors';
import { productsService } from "../services/ProductsService.js";
import { tiposDeError } from "../utils/tiposDeError.js";

const getAllProducts = async (req, res) => {
    try{
        const { limit=10, page=1, order='ASC', search } = req.query;
        const products = await productsService.getProducts({
            limit,
            page,
            order
        }, search);
        
        const { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;

        res.status(200).json({
            data: products.docs,
            paginate: {
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            }
        })
    }catch(error){
        req.logger.error(error.message)
        res.status(404).json({error: error.message});   
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);
        res.status(200).json({
            data: product
        })   
    } catch (error) {
        req.logger.error(error.message)
        res.status(404).json({error: error.message});   
    }
}

const postProduct = async (req, res, next) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    if(!title || !description || !price || !code || !stock || !status || !category){
        req.logger.info("All fields are required")
        return next(createError(tiposDeError.ERROR_ARGUMENTOS_INVALIDOS, "All fields are required"));
    }
    
    const product = await productsService.addProduct(title, description, price, code, stock, status, category, thumbnail);

    return res.status(200).json({
        message: "Product created!", 
        product
    })
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await productsService.updateProduct(id, req.body);
        return res.status(200).json({
            message: "Product updated!"
        })
    }catch(error){
        req.logger.error(error.message)
        res.status(500).json({error: error.message});   
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await productsService.deleteProduct(id, req.user);
        return res.status(200).json({
            message: "Product deleted!"
        })
    }catch(error){
        req.logger.error(error.message)
        res.status(404).json({error: error.message});
    }
}

const getMockingProducts = (req, res) => {
    res.status(200).json({
        data: productsService.getMockingProducts()
    })
}

export {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct,
    getMockingProducts
}