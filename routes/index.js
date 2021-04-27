const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home' });
});

router.get('/reviews', (req, res) => {
  res.render('reviews.ejs', { title: 'reviews' });
});

module.exports = router;
