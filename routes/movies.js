const express = require("express");
const router = express.Router();
const { Genre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");
const auth = require("../services/auth");
const { User } = require("../models/user");
router.post("/", [auth], async(req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("please provide user");

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send("genre doesn't exist");

    const movie = new Movie({
        user: { _id: user._id },

        name: req.body.name,
        genre: { _id: genre._id, name: genre.name },
        numberOfSeasons: req.body.seasons,
        currentSeason: req.body.currentSeason,
        numberOfEpisodes: req.body.episodesPerSeason,
        currentEpisode: req.body.episode,
    });
    if (movie.currentEpisode > movie.numberOfEpisodes) {
        movie.currentSeason =
            movie.currentSeason +
            Math.floor(movie.currentEpisode / movie.numberOfEpisodes);
        movie.currentEpisode = movie.currentEpisode % movie.numberOfEpisodes;
    }
    await movie.save();
    res.send(movie);
});
router.get("/", auth, async(req, res) => {
    const movies = await Movie.find({ "user._id": req.user._id });
    res.send(movies);
});
router.delete("/:id", auth, async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send("movie not available");
    res.send(movie);
});
router.put("/:id", async(req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send("genre doesn't exist");

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("movie not available");
    movie.set({
        name: req.body.name,
        genre: { _id: genre._id, name: genre.name },
        numberOfSeasons: req.body.seasons,
        currentSeason: req.body.currentSeason,
        numberOfEpisodes: req.body.episodesPerSeason,
        currentEpisode: req.body.episode,
    });
    if (movie.currentEpisode > movie.numberOfEpisodes) {
        movie.currentSeason =
            movie.currentSeason +
            Math.floor(movie.currentEpisode / movie.numberOfEpisodes);
        movie.currentEpisode = movie.currentEpisode % movie.numberOfEpisodes;
    }
    await movie.save();
    res.send(movie);
});
router.get("/:id", async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("movie not available");
    res.send(movie);
});
module.exports = router;