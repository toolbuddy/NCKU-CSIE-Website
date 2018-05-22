const express = require( 'express' );

const teacher = require( './teacher' );

const apis = express.Router();

// Resolve URL /api/about
apis.use( '/teacher', teacher );

module.exports = apis;
