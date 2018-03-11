// router for /announcement

const express = require( 'express' );
const router = express.Router();

const query_handler = ( page_name ) => {
    return function(req, res, next){
	    let obj_to_send = new Object();
    
	    obj_to_send.page = req.query.page;
    	obj_to_send.announcement_id = req.query.announcement_id;
    	obj_to_send.tag = req.query.tag;

	    if(obj_to_send.page == undefined) obj_to_send.page = 1;
	
    	if(obj_to_send.announcement_id != undefined){ // check if aid is valid
	    	res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id } );
    	}else{
            // check if page is valid
            // check if tag is valid
	    	res.render( 'announcement/' + page_name, obj_to_send );
    	}
    }    
}


// route to /announcement/all
router.get( '/all', query_handler('/all') );

// route to /announcement/administrator
router.get( '/administrator', query_handler('/administrator') );

// route to /announcement/activity
router.get( '/activity', query_handler('/activity') );

// route to /announcement/speech
router.get( '/speech', query_handler('/speech') );

// route to /announcement/recruitment
router.get( '/recruitment', query_handler('/recruitment') );

function errorHandler( err, req, res, next ) {
    //if ( res. )
}

module.exports = router;
