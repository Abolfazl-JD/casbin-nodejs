const express = require('express');
const router = express.Router();

const media = [{ id: 1, name: 'Image 1' }, { id: 2, name: 'Image 2' }];

// Get all media
router.get('/media', (req, res) => {
  res.json(media);
});

module.exports = router;
