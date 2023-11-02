const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { 
  res.render('djs/index', { name: 'Tito'});
});

router.get('/lookup', (req, res) => {
  res.render('djs/lookup', { name: 'Tito'});
});

module.exports = router;