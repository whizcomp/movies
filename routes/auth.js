const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
router.post("/", async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password ");

    password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(400).send("invalid email or password ");

    const token = user.genAuthToken();
    res.header("x-user-token", token).send(token);
});

function validate(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
    };
    return Joi.validate(user, schema);
}
module.exports = router;