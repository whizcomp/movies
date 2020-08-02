const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Genre } = require("./genre");
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 35,
        required: true,
    },
    genre: new mongoose.Schema({
        name: String,
        _id: String,
    }),
    user: new mongoose.Schema({
        _id: String,
    }),
    numberOfSeasons: {
        type: Number,
        min: 1,
        max: 100,
        required: true,
    },
    currentSeason: {
        type: Number,
        min: 1,
        max: 30,
        required: true,
    },
    numberOfEpisodes: {
        type: Number,
        min: 1,
        max: 30,
        required: true,
    },
    currentEpisode: {
        type: Number,
        min: 1,
        max: 30,
        required: true,
    },
});
const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(2).max(35).required(),
        genreId: Joi.string().required(),
        seasons: Joi.number().min(1).max(100).required(),
        currentSeason: Joi.number().min(1).max(100).required(),
        episodesPerSeason: Joi.number().min(1).max(30).required(),
        episode: Joi.number().min(1).max(30).required(),
    };
    return Joi.validate(movie, schema);
}
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;