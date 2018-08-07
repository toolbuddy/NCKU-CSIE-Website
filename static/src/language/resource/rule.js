const path = require( 'path' );

const languageRoot = path.dirname( __dirname );
const filter = require( path.resolve( languageRoot, 'components/announcement/filter' ) );

const i18n =  Object.freeze( {
    'en-US': {
        'topic':  'Rule',
        'top':    'Top Announcement',
        'normal': 'Announcement',
        'filter': filter[ 'en-US' ],
    },
    'zh-TW': {
        'topic':  '法規彙編',
        'top':    '置頂貼文',
        'normal': '一般公告',
        'filter': filter[ 'zh-TW' ],
    },
} );

module.exports = i18n;
