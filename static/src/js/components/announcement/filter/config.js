const config = {};

Object.defineProperties( config, {
    'defaultStartTime': {
        value: '2018/07/01',
    },
    'defaultEndTime': {
        get(){
            let today = new Date();
            return today.getFullYear() +'/' + ( today.getMonth() + 1 ) + '/' + today.getDate();
        }
    },
    'defaultPage': {
        value: 1,
    },
    'defaultAmount':{
        value: 6,
    }
} );

export default config;
