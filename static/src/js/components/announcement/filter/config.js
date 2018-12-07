const config = {};

Object.defineProperties( config, {
    'defaultStartTime': {
        value: '2018/07/01',
    },
    'defaultEndTime': {
        get () { return Date.now(); },
    },
    'defaultPage': {
        value: 1,
    },
} );

export default config;
