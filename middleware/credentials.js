const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // set the following headers on the server response
        res.set({
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": true
        })
    }
    next();
}

module.exports = credentials