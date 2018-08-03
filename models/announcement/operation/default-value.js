const defaultValue = {};

Object.defineProperties( defaultValue, {
    'defaultStartTime': {
        value: '2018/07/01',
    },
    'defaultEndTime': {
        get () { return Date.now(); },
    },
    'defaultPage': {
        value: 1,
    },
    'defaultLangauge': {
        value: 'zh-TW',
    },
    'announcementsPerPage': {
        value: 6,
    },
} );

module.exports = defaultValue;
