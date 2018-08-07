const express = require( 'express' );

const announcement = require( './announcement' );
const faculty = require( './faculty' );

const apis = express.Router();

// Resolve URL /api/announcement
apis.use( '/announcement', announcement );

// Resolve URL /api/faculty
apis.use( '/faculty', faculty );

module.exports = apis;
