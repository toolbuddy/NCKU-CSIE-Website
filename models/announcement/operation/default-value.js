const defaultValue = {};

Object.defineProperties( defaultValue, {
    'startTime': {
        value: '2018/07/01',
    },
    'endTime': {
        get () { return Date.now(); },
    },
    'page': {
        value: 1,
    },
    'langauge': {
        value: 'zh-TW',
    },
    'announcementsPerPage': {
        value: 6,
    },
} );

module.exports = defaultValue;
