const path = require( 'path' );

const languageRoot = path.dirname( __dirname );
const filter = require( path.resolve( languageRoot, 'components/announcement/filter' ) );

const i18n = Object.freeze( {
    'en-US': {
        'topic':  'All',
        'top':    'Top Announcement',
        'normal': 'Announcement',
        'filter': filter[ 'en-US' ],
    },
    'zh-TW': {
        'topic':  '全部公告',
        'top':    '置頂貼文',
        'normal': '一般公告',
        'filter': filter[ 'zh-TW' ],
    },
} );

module.exports = i18n;
