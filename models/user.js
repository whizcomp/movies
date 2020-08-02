const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    username: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true,
    },
});
userSchema.methods.genAuthToken = function() {
    return jwt.sign({ email: this.email, _id: this._id, username: this.username },
        "whiz"
    );
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    };
    return Joi.validate(user, schema);
}
module.exports.User = User;
module.exports.validateUser = validateUser;