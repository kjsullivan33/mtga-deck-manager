const path = require('path');

const express = require('express');

const decksController = require('../controllers/decks');

const router = express.Router();

router.get('/', decksController.getDecks );

router.get('/cards/:deckId', decksController.getDeck);

module.exports = router;