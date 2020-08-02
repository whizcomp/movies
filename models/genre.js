const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    }
});
const Genre = mongoose.model('genre', genreSchema);

function genreValid(genre) {
    const schema = {
        name: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(genre, schema);
}
module.exports.Genre = Genre;
module.exports.genreValid = genreValid;