// router for /announcement

const express = require( 'express' );
const router = express.Router();
const testDB = require( './testDB' );

const query_handler = ( page_name ) => {
    return function(req, res, next){
	    let obj_to_send = {page: req.query.page, annoucement_id: req.query.announcement_id, tag: req.query.tag, data_number: 0};
	    
        if(obj_to_send.page == undefined) obj_to_send.page = 1;
      
        // tag correspond.
        switch (page_name){
            case '/all':
                obj_to_send.tag = 1;
                break;
            case '/administrator':
                obj_to_send.tag = 2;
                break;
            case '/activity':
                obj_to_send.tag = 3;
                break;
            case '/speech':
                obj_to_send.tag = 4;
                break;
            case '/recruitment':
                obj_to_send.tag = 5;
                break;
        }
        let data = {data_number: 1, content: testDB.find()};
        if(obj_to_send.announcement_id != undefined){
	        res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id} );
    	}else{
	        res.render( 'announcement/' + page_name, data);
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
