const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
	res.render(
		'student/index'
	);
})

router.get('/ci',function(req,res){
	res.render(
		'student/courseintroduce' 
	);
})

router.get('/college',function(req,res){
	res.render(
		'student/college'
	);
})

router.get( '/graduate',function(req,res){
	res.render(
		'student/graduate'
	);
} )

router.get( '/money' ,function(req,res){
	res.render(
		'student/money'
	);
})

router.get( '/international' ,function(req,res){
	res.render(
		'student/internationalinteraction'
	);
})

module.exports=router;
