const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("x-user-token");
    if (!token) return res.status(401).send("token not provided");
    try {
        const decoded = jwt.verify(token, "whiz");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("please login first");
    }
};