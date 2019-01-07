const path = require('path');

const express = require('express');

const decksController = require('../controllers/decks');

const router = express.Router();


router.get('/add-deck', decksController.getAddDecks);

router.post('/add-deck', decksController.postAddDecks);

module.exports = router;
