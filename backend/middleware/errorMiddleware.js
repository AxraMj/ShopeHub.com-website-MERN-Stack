const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Log the error for debugging
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        body: req.body,
        params: req.params,
        query: req.query,
        user: req.user ? req.user._id : null
    });

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export { notFound, errorHandler }; 