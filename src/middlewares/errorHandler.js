export const errorHandler = (err, req, res, next) => {
    if (err) {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message
            }
        });
    }
    next();
}