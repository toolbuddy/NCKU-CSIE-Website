// 公告的路由

const express = require('express');
const router = express.Router();

// 所有公告
router.get('/', UrlSetting, function(req, res, next) {
    res.render('announce/all');
});
router.get('/all', UrlSetting, function(req, res, next) {
    res.render('announce/all');
});

// 行政公告
router.get('/administrate', UrlSetting, function(req, res, next) {
    res.render('announce/administrate');
});

// 活動訊息
router.get('/activity', UrlSetting, function(req, res, next) {
    res.render('announce/activity');
});

// 演講公告
router.get('/speech', UrlSetting, function(req, res, next) {
    res.render('announce/speech');
});

// 企業徵才
router.get('/recruit', UrlSetting, function(req, res, next) {
    res.render('announce/recruit');
});

function UrlSetting(req, res, next){
    res.locals = {
        root: '/',
        announce: '/announce'
    };
    next();
}

module.exports = router;