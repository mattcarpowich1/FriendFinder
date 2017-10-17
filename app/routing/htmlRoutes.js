const express = require('express');
const path = require('path');
const router = express.Router();

// GET the home page
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "../public/home.html"));
});

// GET the survey page
router.get('/survey', (req, res) => {
	res.sendFile(path.join(__dirname, "../public/survey.html"));
});

module.exports = router;