const express = require('express');
const router = express.Router();
const { User, Show } = require('../models');

// GET /users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Not found');
    };
});

//  GET /users/:id/shows watched by a user
router.get('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        const shows = await user.getShows();
        res.json(shows);
    } else {
        res.status(404).send('Not found');
    };
});

//  PUT /users/:id update and add a show if a user has watched it
router.put('/:id/shows/:showId', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        const show = await Show.findByPk(req.params.showId);
        if (show) {
            await user.addShow(show);
            res.json(show);
        } else {
            res.status(404).send('Show not found');
        };
    } else {
        res.status(404).send('User not found');
    };
});

module.exports = router;
