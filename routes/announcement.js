// router for /announcement

const express = require('express');
const router = express.Router();

// route to /announcement/all
router.get('/all', function(req, res, next) {
    res.render('announcement/all');
});

// route to /announcement/administrator
router.get('/administrator', function(req, res, next) {
    res.render('announcement/administrator');
});

// route to /announcement/activity
router.get('/activity', function(req, res, next) {
    res.render('announcement/activity');
});

// route to /announcement/speech
router.get('/speech', function(req, res, next) {
    res.render('announcement/speech');
});

// route to /announcement/recruit
router.get('/recruit', function(req, res, next) {
    res.render('announcement/recruit');
});


module.exports = router;
