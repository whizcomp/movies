const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.post("/", async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("email already taken");

    user = new User(_.pick(req.body, ["email", "username", "password"]));
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = user.genAuthToken();
    res.header("x-user-token", token).send(token);
});
module.exports = router;