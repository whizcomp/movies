module.exports = function(error, req, res, next) {
    res.status(500).send("internal server error");
};