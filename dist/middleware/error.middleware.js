/**
 * Error-handling middleware
 * This should be added after all routes in app.ts
 */
export const errorMiddleware = (err, req, res, next) => {
    console.error(err); // log the full error for debugging
    const statusCode = err.status || 500; // default to 500 if not specified
    const message = err.message || 'Internal Server Error';
    // Optional: include validation errors if available
    const errors = err.errors || undefined;
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        errors,
    });
};
