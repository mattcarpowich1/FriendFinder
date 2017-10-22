const express = require('express');
const router = express.Router();
let friends = require('../data/friends.js');

// GET the JSON data from friends.js
router.get('/friends', (req, res) => {
	res.json(friends);
});

// POST the form data from survey.html,
// and send back the best match 
router.post('/friends', (req, res) => {

  let data = req.body;
  let bestMatch;

  // Save new user data 
  let newUser = {
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

  // Start off with an impossibly high number
  let lowestDifference = 100;

  // Loop through all possible new friends...
  for (let i = 0; i < friends.length; i++) {

    let currentFriend = friends[i];
    let difference = 0;

    // Loop through both arrays of scores
    for (let j = 0; j < 10; j++) {

      difference += Math.abs(
        newUser.scores[j] - currentFriend.scores[j]);

    }

    // Keep the matches fresh
    if (difference <= lowestDifference) {
      lowestDifference = difference;
      bestMatch = currentFriend;
    }

  }

  // Add new user to the friends array in memory
  friends.push(newUser);

  // Send back JSON of best match
  res.json(bestMatch);

});

module.exports = router;