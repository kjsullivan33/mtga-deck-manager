//Obtains the card data from the Scryfall api and adds it to decks.json using the card id
//available within decks.json from MTGA arena output log file.

const fetchCardData = require('../util/api');

async function setURL(id) {
  return `https://api.scryfall.com/cards/arena/${id.toString()}`;
}

async function addCardData(decks) {
  let promises1 = decks.map(async function (deck) {
    let promises2 = deck.mainDeck.map(async function (card) {
      return setURL(card.id)
        .then(url => {
          return fetchCardData(url);
        })
        .then(results => {
          card.name = results.name;
          card.colors = results.colors;
          return card;
        });
    });
    const results = await Promise.all(promises2);
    deck.mainDeck = results;
    return deck;
    
  });
  const results = await Promise.all(promises1);
  decks = results;
  console.log(decks);
  return decks;
}

module.exports = addCardData;