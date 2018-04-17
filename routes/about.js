const express = require( 'express' );
const csie = require( '../settings/database/connect' )( 'csie' );
const router = new express.Router();

// connect to csie database and use tables in it
const table = {
    teachers: csie.import( '../models/csie/TEACHERS' ),
};

// deal with the URL about/intro
router.get( '/intro', function ( req, res ) {
    res.render( 'about/intro' );
} );

// deal with the URL about/teachers
router.get( '/teachers', function ( req, res ) {
    table.teachers.findAll( {
        attributes: [ 'ID', ],
        raw: true,
    } )
        .then( Ts => {
            res.render( 'about/teachers', {
                teacher: Ts,
            } );
        } );
} );

// deal with URLs to teachers pages
router.get( '/teachers/:id', function ( req, res ) {
    table.teachers.findOne( {
        where: {
            ID: req.params.id,
        },
        raw: true,
    } )
        .then( teacher => {
            res.send( teacher );
        } );
} );

// deal with the URL about/members
router.get( '/members', function ( req, res ) {
    res.render( 'about/members' );
} );

// deal with the URL about/honor
router.get( '/honor', function ( req, res ) {
    res.render( 'about/honor' );
} );

// deal with the URL about/location
router.get( '/location', function ( req, res ) {
    res.render( 'about/location' );
} );

module.exports = router;
