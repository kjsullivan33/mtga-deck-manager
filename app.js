const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const deckRoutes = require('./routes/decks');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(deckRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);