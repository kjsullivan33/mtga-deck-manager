const deckData = require('../data/decks.json');
const getUnique = require('../util/getUnique');

const Deck = require('../models/deck');



exports.getDecks = (req, res, next) => {
  Deck.fetchAll((decks) => {
    decks.map(function (deck) {
      let colorArray = [...new Set(deck.mainDeck.map(card => card.colors))];
      const uniqueColors = getUnique(colorArray.join(',').split(','));
      console.log(uniqueColors.join(','));
      deck.deckColors = uniqueColors.join(',');
    });
  res.render('decks', { decks: decks, pageTitle: 'My Decks', path: '/' });
});
};

exports.getDeck = (req, res, next) => {
  const deckId = req.params.deckId;
  Deck.findById(deckId, deck => {
    res.render('cards',
    {
      deck: deck,
      pageTitle: deck.name,
      path: '/cards'
    })
  })
}

exports.getAddDecks = (req, res, next) => {
  res.render('add-deck', { pageTitle: 'Add Decks', path: '/admin/add-deck' });
};

exports.postAddDecks = (req, res, next) => {
  const deck = new Deck(req.body.title);
  deck.save();
  res.redirect('/');
};