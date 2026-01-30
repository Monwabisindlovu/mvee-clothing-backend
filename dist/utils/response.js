export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
};
export const errorResponse = (res, message = 'Something went wrong', statusCode = 500, errors) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
        errors: errors || null,
    });
};
//# sourceMappingURL=response.js.map