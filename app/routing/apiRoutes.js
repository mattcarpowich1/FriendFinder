const express = require('express');
const router = express.Router();
let friends = require('../data/friends.js');

// GET the JSON data from friends.js
router.get('/friends', (req, res) => {
	res.json(friends);
});

// POST the form data from survey.html
router.post('/friends', (req, res) => {
  let data = req.body;
  let newFriend = {
    name: data["name"],
    photo: data["link"],
    scores: [
      parseInt(data.q1),
      parseInt(data.q2),
      parseInt(data.q3),
      parseInt(data.q4),
      parseInt(data.q5),
      parseInt(data.q6),
      parseInt(data.q7),
      parseInt(data.q8),
      parseInt(data.q9),
      parseInt(data.q10)
    ]
  };
  friends.push(newFriend);
  res.redirect('/');
});

module.exports = router;