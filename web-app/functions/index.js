const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Set up express app
const main = express();

const webhooks = express();
const api = express();

// Automatically allow cross-origin requests
main.use(cors({ origin: true }));

// For parsing application/json
main.use(bodyParser.json());

// Init api routes
webhooks.use(require('./routes/webhooks'));
api.use(require('./routes/api'));

main.use('/webhooks', webhooks);
main.use('/', api);

exports.api = functions.https.onRequest(main);
