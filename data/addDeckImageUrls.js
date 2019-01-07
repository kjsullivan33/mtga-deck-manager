// Uses the DeckTileId included in the MTGA Arena Output log to obtain the image url
// from the Scryfall API and adds to decks.json

const fetchDeckImage = require('../util/api');

async function setURL(id) {
  return `https://api.scryfall.com/cards/arena/${id.toString()}`;
}

async function addDeckImageUrls(decks) {
  let promises = decks.map(async function (deck, index) {
    return setURL(deck.deckTileId)
      .then(url => {
        return fetchDeckImage(url);
      })
      .then(results => {
        deck.deckImage = results.image_uris.art_crop;
        deck.key = index;
        return decks;
      });
  });
  const results = await Promise.all(promises);
  return results;
}

module.exports = addDeckImageUrls;
