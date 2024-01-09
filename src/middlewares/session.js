export const verifySession = (req, res, next) => {
    res.locals.session = req.session;
    res.locals.isAuthenticated = req.session.user ? true : false;
    next();
}