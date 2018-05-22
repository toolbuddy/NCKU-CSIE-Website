const express = require( 'express' );

const about = require( './about' );

const apis = express.Router();

// Resolve URL /api/about
apis.use( '/about', about );

module.exports = apis;
