const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { 
  res.render('djs/index');
});

router.get('/lookup', (req, res) => {
  res.render('djs/lookup');
});

module.exports = router;