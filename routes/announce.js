// 公告的路由

const express = require('express');
const router = express.Router();

// 所有公告
router.get('/', function(req, res, next) {
    res.render('announce/all');
});
router.get('/all', function(req, res, next) {
    res.render('announce/all');
});

// 行政公告
router.get('/administrate', function(req, res, next) {
    res.render('announce/administrate');
});

// 活動訊息
router.get('/activity', function(req, res, next) {
    res.render('announce/activity');
});

// 演講公告
router.get('/speech', function(req, res, next) {
    res.render('announce/speech');
});

// 企業徵才
router.get('/recruit', function(req, res, next) {
    res.render('announce/recruit');
});


module.exports = router;