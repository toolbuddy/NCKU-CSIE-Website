/**
 * Router module for route `/student`.
 *
 * Including following sub-routes:
 * - `/student`
 * - `/student/college`
 * - `/student/course`
 * - `/student/international`
 * - `/student/internship`
 * - `/student/master`
 * - `/student/phd`
 * - `/student/scholarship`
 */

import path from 'path';

import express from 'express';

import config from 'settings/server/config.js';

const router = express.Router();
const testDB = require ( './testDB' );

const query_handler = ( page_name ) => {
    return function(req, res, next){
        let obj_to_send = {page: req.query.page, annoucement_id: req.query.announcement_id, tag: req.query.tag, data_number: 0};

        if(obj_to_send.page == undefined) obj_to_send.page = 1;

        // tag correspond.
        switch (page_name){
            case '/course':
                obj_to_send.tag = 6;
                break;
            case '/college':
                obj_to_send.tag = 7;
                break;
            case '/master':
                obj_to_send.tag = 8;
                break;
            case '/phd':
				obj_to_send.tag = 9;
                break;
            case '/scholarship':
                obj_to_send.tag = 10;
                break;
			case '/international':
				obj_to_send.tag =11;
				break;
        }
        let data = {data_number: 1, content: testDB.find()};
        if(obj_to_send.announcement_id != undefined){
            res.render( 'student/detail', { announcement_id: obj_to_send.announcement_id} );
        }else{
            res.render( 'student/' + page_name, data);
        }
    }
}

/**
 * Resolve URL `/student`.
 */

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/college`.
 */

router.get( /^\/college/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/college.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/course`.
 */

router.get( /^\/course$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/course.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/international`.
 */

router.get( /^\/international$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/international.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/internship`.
 */

router.get( /^\/internship$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/internship.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/master`.
 */

router.get( /^\/master$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/master.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/phd`.
 */

router.get( /^\/phd$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/phd.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/scholarship`.
 */

router.get( /^\/scholarship$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/student/scholarship.${ req.query.language }.html` ) );
} );

export default router;
