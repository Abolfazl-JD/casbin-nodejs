const express = require('express');
const router = express.Router();

const articles = [{ id: 1, title: 'Article 1' }, { id: 2, title: 'Article 2' }];

// Get all articles
router.get('/articles', (req, res) => {
  res.json(articles);
});

// Add a new article
router.post('/articles', (req, res) => {
  const newArticle = { id: articles.length + 1, title: req.body.title };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

module.exports = router;
