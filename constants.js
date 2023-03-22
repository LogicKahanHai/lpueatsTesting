const resConstants = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,

    // [ ]: Check if these error constants are needed.
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    GATEWAY_TIMEOUT: 504,
    SERVICE_UNAVAILABLE: 503,
    

}

module.exports = resConstants;