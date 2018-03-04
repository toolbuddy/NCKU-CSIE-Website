const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
	res.render(
		'student/index'
	);
})

router.get('/CourseIntroduce',function(req,res){
	res.render(
		'student/ci' 
	);
})

router.get('/College',function(req,res){
	res.render(
		'student/college'
	);
})

router.get( '/graduate',function(req,res){
	res.render(
		'student/graduate'
	);
} )

router.get( '/Money' ,function(req,res){
	res.render(
		'student/money'
	);
})

router.get( '/International' ,function(req,res){
	res.render(
		'student/international'
	);
})

module.exports=router;
