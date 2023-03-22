const constants = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statuscode = err.statusCode || constants.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(statuscode).json({
        success: false,
        message
    });
}

module.exports = errorHandler;