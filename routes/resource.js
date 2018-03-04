// 資源連結的路由

const express = require('express');
const router = express.Router();

// 法規
router.get('/', UrlSetting, function(req, res, next) {
    res.render('resource/law');
});
router.get('/law', UrlSetting, function(req, res, next) {
    res.render('resource/law');
});

// 線上租借
router.get('/rent', UrlSetting, function(req, res, next) {
    res.render('resource/rent');
});

// 修繕登記
router.get('/fix', UrlSetting, function(req, res, next) {
    res.render('resource/fix');
});

// 工程認證
router.get('/certification', UrlSetting, function(req, res, next) {
    res.render('resource/certification');
});

// 線上資源
router.get('/res', UrlSetting, function(req, res, next) {
    res.render('resource/res');
});

function UrlSetting(req, res, next){
    res.locals = {
        root: '/',
        resource: '/resource'
    };
    next();
}

module.exports = router;