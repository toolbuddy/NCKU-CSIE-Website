const express = require( 'express' );

const announcement = require( './announcement' );
const teacher = require( './teacher' );
const teachers = require( './teachers' );

const apis = express.Router();

// Resolve URL /api/announcement
apis.use( '/announcement', announcement );

// Resolve URL /api/teacher
apis.use( '/teacher', teacher );

// Resolve URL /api/teachers
apis.use( '/teachers', teachers );

module.exports = apis;
