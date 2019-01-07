//1.Reads the MTGA Output Log file to obtain the Deck Collection JSON data
//2.Calls the addDeckImageUrls function to add the deck image url to the object
//3.Calls the addCardData function to add the individual card name and color(s) to the object
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stream = require('stream');

const addDeckImageUrls = require('./addDeckImageUrls');
const addCardData = require('./addCardData');

const filePath = path.join(__dirname, '..', 'assets', 'MTGA output log 12-14.txt');

const instream = fs.createReadStream(filePath);
const outstream = new stream;
const rl = readline.createInterface(instream, outstream);

let array = [];

rl.on('line', function (line) {
  if (line === "<== Deck.GetDeckLists(9)"){
    rl.on('line', function (line) {
      if (line.startsWith("[UnityCrossThreadLogger]")){
        rl.close();
      }
      array.push(line);
    });
  }
});

rl.on('close', function () {
  // do something on finish here
  
  addDeckImageUrls(JSON.parse(array.join('')))
  .then(data => {
    console.log(data[0]);
    return addCardData(data[0]);
  })
  .then(data => {
    fs.writeFileSync('decks.json', JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(`Data saved!: ${json}`);
    });
  });
});

