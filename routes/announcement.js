// router for /announcement

const express = require( 'express' );
const router = express.Router();


// route to /announcement/all
router.get( '/all', function( req, res, next ) {
	let obj_to_send = new Object();
    
	obj_to_send.page = req.query.page;
	obj_to_send.announcement_id = req.query.announcement_id;
	obj_to_send.tag = req.query.tag;
	
	if(obj_to_send.page == undefined) obj_to_send.page = 1;
	
	if(obj_to_send.announcement_id != undefined){
		res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id } );
	}else{
		res.render( 'announcement/all', obj_to_send );
	}
    
} );

// route to /announcement/administrator
router.get( '/administrator', function( req, res ) {
	let obj_to_send = new Object();
    
	obj_to_send.page = req.query.page;
	obj_to_send.announcement_id = req.query.announcement_id;
	obj_to_send.tag = req.query.tag;
	
	if(obj_to_send.page == undefined) obj_to_send.page = 1;
	
	if(obj_to_send.announcement_id != undefined){
		res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id } );
	}else{
		res.render( 'announcement/administrator', obj_to_send );
	}
} );

// route to /announcement/activity
router.get( '/activity', function( req, res ) {
	let obj_to_send = new Object();
    
	obj_to_send.page = req.query.page;
	obj_to_send.announcement_id = req.query.announcement_id;
	obj_to_send.tag = req.query.tag;
	
	if(obj_to_send.page == undefined) obj_to_send.page = 1;
	
	if(obj_to_send.announcement_id != undefined){
		res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id } );
	}else{
		res.render( 'announcement/activity', obj_to_send );
	}
} );

// route to /announcement/speech
router.get( '/speech', function( req, res ) {
	let obj_to_send = new Object();
    
	obj_to_send.page = req.query.page;
	obj_to_send.announcement_id = req.query.announcement_id;
	obj_to_send.tag = req.query.tag;
	
	if(obj_to_send.page == undefined) obj_to_send.page = 1;
	
	if(obj_to_send.announcement_id != undefined){
		res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id } );
	}else{
		res.render( 'announcement/speech', obj_to_send );
	}
} );

// route to /announcement/recruitment
router.get( '/recruitment', function( req, res ) {
	let obj_to_send = new Object();
    
	obj_to_send.page = req.query.page;
	obj_to_send.announcement_id = req.query.announcement_id;
	obj_to_send.tag = req.query.tag;
	
	if(obj_to_send.page == undefined) obj_to_send.page = 1;
	
	if(obj_to_send.announcement_id != undefined){
		res.render( 'announcement/detail', { announcement_id: obj_to_send.announcement_id } );
	}else{
		res.render( 'announcement/recruitment', obj_to_send );
	}
} );

function errorHandler( err, req, res, next ) {
    //if ( res. )
}

module.exports = router;
