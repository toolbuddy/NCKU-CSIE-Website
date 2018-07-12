const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const data = [
    {
        title:     'title 1',
        content:   'content 1 content 1 content 1 content 1 content 1 content 1 content 1 ...',
        tag:       [ '大學部',
            '演講',
            '徵才', ],
        editTime:  new Date( 2018, 6, 24, 10, 33, 30 ),
        pinned:    false,
    },
    {
        title:     'title 2',
        content:   'content 2 content 2 content 2 content 2 content 2 content 2 content 2 ...',
        tag:       [ '碩士班',
            '博士班', ],
        editTime:  new Date( 2018, 6, 23, 8, 24, 12 ),
        pinned:    false,
    },
    {
        title:     'title 3',
        content:   'content 3 content 3 content 3 content 3 content 3 content 3 content 3 ...',
        tag:       [ '大學部', ],
        editTime:  new Date( 2018, 6, 18, 12, 36, 1 ),
        pinned:    true,
    },
    {
        title:     'title 4',
        content:   'content 4 content 4 content 4 content 4 content 4 content 4 content 4 ...',
        tag:       [ '演講', ],
        editTime:  new Date( 2018, 6, 12, 15, 54, 42 ),
        pinned:    false,
    },
    {
        title:     'title 5',
        content:   'content 5 content 5 content 5 content 5 content 5 content 5 content 5 ...',
        tag:       [ '法規彙編', ],
        editTime:  new Date( 2016, 5, 24, 8, 1, 35 ),
        pinned:    false,
    },
];

// Const getTeacherProfile = require( `${ projectRoot }/models/teacher/operation/get-teacher-profile` );

apis.get( '/', async ( req, res ) => {
    const responseData = [];
    data.forEach( ( x ) => {
        for ( const tag of req.query.tags ) {
            if ( x.tag.indexOf( tag ) >= 0 )
                responseData.push( x );
        }
    } );
    res.json( responseData );
} );

module.exports = apis;
