const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const home = require('./app/routing/htmlRoutes');
const api = require('./app/routing/apiRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/api', api);

app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
});

module.exports = app;