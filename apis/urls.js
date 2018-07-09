const express = require( 'express' );

const teacher = require( './teacher' );
const announcement = require( './announcement' );

const apis = express.Router();

// Resolve URL /api/about
apis.use( '/teacher', teacher );
apis.use( '/announcement', announcement );

module.exports = apis;
