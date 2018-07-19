const path = require( 'path' );

const languageRoot = path.dirname( __dirname );
const filter = require( path.resolve( languageRoot, 'components/announcement/filter' ) );

const i18n = Object.freeze( {
    'en-US': {
        'topic':  'Recruitments',
        'top':    'Top Announcement',
        'normal': 'Announcement',
        'filter': filter[ 'zh-TW' ],
    },
    'zh-TW': {
        'topic':  '企業徵才',
        'top':    '置頂貼文',
        'normal': '一般公告',
        'filter': filter[ 'zh-TW' ],
    },
} );

module.exports = i18n;
