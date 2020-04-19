const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

// Set up express app
const main = express();

const webhooks = express();
const api = express();

// Automatically allow cross-origin requests
main.use(cors({ origin: true }));

// For parsing application/json
main.use(bodyParser.json());

// For graphql
main.use('/graphql', graphqlHTTP({

}));

// Init api routes
webhooks.use(require('./routes/webhooks'));
api.use(require('./routes/api'));

main.use('/webhooks', webhooks);
main.use('/', api);

exports.api = functions.https.onRequest(main);
