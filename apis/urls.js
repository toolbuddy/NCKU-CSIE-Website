const express = require( 'express' );
const path = require( 'path' );

const projectRoot = path.dirname( __dirname );
const announcement = require( path.join( projectRoot, 'apis/announcement') );
const teacher = require( path.join( projectRoot, 'apis/teacher') );
const teachers = require( path.join( projectRoot, 'apis/teachers' ) );

const apis = express.Router();

// Resolve URL /api/announcement
apis.use( '/announcement', announcement );

// Resolve URL /api/teacher
apis.use( '/teacher', teacher );

// Resolve URL /api/teachers
apis.use( '/teachers', teachers );

module.exports = apis;
