const defaultValue = {};

Object.defineProperties( defaultValue, {
    'startTime': {
        value: new Date( '2018/07/01' ).toISOString(),
    },
    'endTime': {
        get () { return new Date( Date.now() ).toISOString(); },
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

export default defaultValue;
