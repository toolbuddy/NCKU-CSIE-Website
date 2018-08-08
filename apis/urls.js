const express = require( 'express' );
const path = require( 'path' );

const projectRoot = path.dirname( __dirname );
const announcement = require( path.join( projectRoot, 'apis/announcement') );
const faculty = require( path.join( projectRoot, 'apis/faculty') );

const apis = express.Router();

// Resolve URL /api/announcement
apis.use( '/announcement', announcement );

// Resolve URL /api/faculty
apis.use( '/faculty', faculty );

module.exports = apis;
