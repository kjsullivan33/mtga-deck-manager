const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'decks.json');

const getDecksFromFile = (cb) => {

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
}


module.exports = class Deck {
  constructor(deck) {
    this.deck = deck;
  }

  save() {
    getDecksFromFile(decks => {
      decks.push(this);
      fs.writeFile(p, JSON.stringify(decks), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getDecksFromFile(cb);
  }

  static findById(id, cb) {
    getDecksFromFile(decks => {
      const deck = decks.find(d => d.id === id);
      cb(deck);
    })
  }
}