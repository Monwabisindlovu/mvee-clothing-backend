/**
 * Global error-handling middleware
 * Must be registered LAST in app.ts
 */
export const errorHandler = (err, _req, res, _next) => {
    const error = err;
    console.error('❌ Error caught:', error);
    const statusCode = error.status ?? 500;
    const message = error.message ?? 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        errors: error.errors ?? null,
        timestamp: new Date().toISOString(),
    });
};
