const express = require( 'express' );

const teacher = require( './teacher' );
const teachers = require( './teachers' );

const apis = express.Router();

// Resolve URL /api/teacher
apis.use( '/teacher', teacher );

// Resolve URL /api/teacher
apis.use( '/teachers', teachers );

module.exports = apis;
