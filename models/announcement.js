const config = require('../settings/server/config');

module.exports.findForIndex =function() {
    return {"title": 'Feed me plz', "date": '2018-02-02', "time": '15:30'};
}

module.exports.findType = function (from = new Date(1970, 1, 1, 0, 0, 0), to = Date.now, page = 1, ...tags) {
    // check the from and to
    // check tags
    // get the data from database according to from & to & tag
    return {"tag": [1], "title": 'Feed me plz', "date": '2018-02-02', "time": '15:30',  "content": 'Eat Eat Fat Fat', "picture": `${config.static}/images/hamburger.png`, "file": undefined };
}

module.exports.findDetail = function (id) {
    return {"tag": [1], "title": 'Feed me plz', "date": '2018-02-02', "time": '15:30', "author":"Iris",  "content": 'Eat Eat Fat Fat', "picture": [`${config.static}/images/hamburger.jpg`], "file": [undefined] };
}

