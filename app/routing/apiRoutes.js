const express = require('express');
const router = express.Router();
let friends = require('../data/friends.js');

// GET the JSON data from friends.js
router.get('/friends', (req, res) => {
	res.json(friends);
});

module.exports = router;