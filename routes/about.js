const express = require('express');
const router = express.Router();

// deal with the URL about/intro
router.get('/intro', function(req, res, next) {
    res.render('about/intro');
});

// deal with the URL about/teachers
router.get('/teachers', function(req, res, next) {
    res.render('about/teachers');
});

// deal with the URL about/members.
router.get('/members', function(req, res, next) {
    res.render('about/members');
});

// deal with the URL about/honor.
router.get('/honor', function(req, res, next) {
    res.render('about/honor');
});

// deal with the URL about/location.
router.get('/location', function(req, res, next) {
    res.render('about/location');
});

module.exports = router;
