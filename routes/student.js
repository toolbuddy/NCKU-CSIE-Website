// router for /student
const express = require( 'express' );
const router = express.Router();

const query_handler = ( page_name ) => {
    return function(req, res, next){
        let obj_to_send = new Object();

        obj_to_send.page = req.query.page;
        obj_to_send.announcement_id = req.query.announcement_id;
        obj_to_send.tag = req.query.tag;

        if(obj_to_send.page == undefined) obj_to_send.page = 1;

        if(obj_to_send.announcement_id != undefined){
            res.render( 'student/detail', { announcement_id: obj_to_send.announcement_id } );
        }else{
            res.render( 'student/' + page_name, obj_to_send );
        }
    }
}

// route to /student/course
router.get( '/course', query_handler("course"));

// route to /student/college
router.get( '/college', query_handler("college"));

// route to /student/master
router.get( '/master', query_handler("master"));

// route to /student/phd
router.get( '/phd', query_handler("phd"));

// route to /student/scholarship
router.get( '/scholarship',query_handler("scholarship"));

// route to /student/international
router.get( '/international', query_handler("international"));

module.exports = router;
