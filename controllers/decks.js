const deckData = require('../data/decks.json');
const getUnique = require('../util/getUnique');

const Deck = require('../models/deck');



exports.getDecks = (req, res, next) => {
  Deck.fetchAll((products) => {
    products.map(function (deck) {
      let colorArray = [...new Set(deck.mainDeck.map(card => card.colors))];
      const uniqueColors = getUnique(colorArray.join(',').split(','));
      console.log(uniqueColors.join(','));
      deck.deckColors = uniqueColors.join(',');
    });
  res.render('decks', { decks: products, pageTitle: 'My Decks', path: '/' });
});
};

exports.getAddDecks = (req, res, next) => {
  res.render('add-deck', { pageTitle: 'Add Decks', path: '/admin/add-deck' });
};

exports.postAddDecks = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};