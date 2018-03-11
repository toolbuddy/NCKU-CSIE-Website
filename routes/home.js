const express = require( 'express' );

const router = express.Router();

// route to root directory
router.get( '/', function( req, res ) {
    let obj_to_send = new Object();

    obj_to_send.announcement_id = req.query.announcement_id;
    obj_to_send.tag = req.query.tag;
    obj_to_send.time = req.query.time;

    if(obj_to_send.time == undefined) obj_to_send.time = 0;

    if(obj_to_send.announcement_id != undefined){
        // check if announcement_id is valid
        res.render( 'announcement/detail', {announcement_id : obj_to_send.announcement_id} );
    }else{
        // check if tag is valid
        // check if time is valid
        res.render( 'home/index', obj_to_send );
    }
} );

module.exports = router;
