// 資源連結的路由

const express = require('express');
const router = express.Router();

// 法規
router.get('/', function(req, res, next) {
    res.render('resource/law');
});
router.get('/law', function(req, res, next) {
    res.render('resource/law');
});

// 線上租借
router.get('/rent', function(req, res, next) {
    res.render('resource/rent');
});

// 修繕登記
router.get('/fix', function(req, res, next) {
    res.render('resource/fix');
});

// 工程認證
router.get('/certification', function(req, res, next) {
    res.render('resource/certification');
});

// 線上資源
router.get('/res', function(req, res, next) {
    res.render('resource/res');
});


module.exports = router;
