const express = require( 'express' );
const announcement = require( './announcement' );
const config = require( '../settings/server/config' );
const api = express.Router();

// route to announceent api
api.use( '/announcement', announcement );

module.exports = api;
