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

const tagNumToName = Object.freeze( {
    'zh-TW': {
        '1':  '教職人員',
        '2':  '課程',
        '3':  '大學部',
        '4':  '碩士',
        '5':  '博士',
        '6':  '演講',
        '7':  '研討會',
        '8':  '展覽',
        '9':  '競賽',
        '10': '獎學金',
        '11': '國際交流',
        '12': '實習',
        '13': '法規彙編',
        '14': '徵人',
        '15': '榮譽',
    },
    'en-US': {
        '1':  'faculty',
        '2':  'course',
        '3':  'college',
        '4':  'master',
        '5':  'phd',
        '6':  'speech',
        '7':  'conference',
        '8':  'exhibition',
        '9':  'competition',
        '10': 'scholarship',
        '11': 'international',
        '12': 'internship',
        '13': 'rule',
        '14': 'recruitment',
        '15': 'award',
    },
} );

function getTagNameToNum ( tagNumToNameObj ) {
    const obj = {};

    for ( const language of Object.keys( tagNumToNameObj ) ) {
        const keys = Object.keys( tagNumToNameObj[ language ] );
        obj[ language ] = {};
        for ( const key of keys )
            obj[ language ][ tagNumToNameObj[ language ][ key ] ] = key;
    }
    return obj;
}
const tagNameToNum = getTagNameToNum( tagNumToName );

export { defaultValue, tagNameToNum, tagNumToName, };
