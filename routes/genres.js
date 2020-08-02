const express = require('express');
const router = express.Router();
const { Genre, genreValid } = require('../models/genre');

router.post('/', async(req, res) => {
    const { error } = genreValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});
router.get('/', async(req, res) => {
    const genres = await Genre.find({});
    res.send(genres);
})
router.delete('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('genre not found');
    res.send(genre);
});
router.put('/:id', async(req, res) => {
    const { error } = genreValid(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });
    res.send(genre);
})
module.exports = router;