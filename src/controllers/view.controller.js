import { productsService } from "../services/ProductsService.js";
import { cartService } from "../services/CartService.js";
import { usersService } from "../services/UsersServices.js";

const login = async (req, res) => {
    res.render("login");
}

const register = async (req, res) => {
    res.render("register");
}

const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/view/login");
}

const profile = async (req, res) => {
    const user = await usersService.findUserById(req.session.user._id);
    res.render("profile", user);
}

const products = async (req, res) => {
    try{
        const { limit=8, page=1, order='ASC', search } = req.query;
        const products = await productsService.getProducts({
            limit,
            page,
            order
        }, search);
        
        const { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;

        return res.render("products", {
            products: products.docs,
            paginate: {
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            }
        })
    }catch(error){
        
    }
}

const productsById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsService.getProductById(pid);
        res.render("product", product);
    } catch (error) {
        
    }
}

const cartProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await cartService.getProductsCart(cid);
        res.render("cart", {cartProducts, cid});
    } catch (error) {
        res.render("cart", {cartProducts: null, cid: null});
    }
}

const realTimeProducts = (req, res) => {
    res.render("realtimeproducts");
}

const chat = (req, res) => {
    res.render("chat");
}

const home = (req, res) => {
    res.render("home", {user: req.session.user});
}

const olvido = (req, res) => {
    res.render("olvido");
}

const recuperar = async (req, res, next) => {

    const { token } = req.params;
    
    const resetToken = global.passwordResetTokens[token];

    if (!resetToken || Date.now() > resetToken.expires) {
        res.redirect('/view/olvido');
    } else {
        res.render('recuperar', { token });
    }

}

export {
    login,
    register,
    logout,
    profile,
    products,
    productsById,
    realTimeProducts,
    chat,
    cartProducts,
    home,
    olvido,
    recuperar
};