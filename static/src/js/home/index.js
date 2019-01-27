import header from 'static/src/js/components/common/header/index.js';
import briefing from 'static/src/pug/components/announcement/briefing.pug';
import briefingHot from 'static/src/pug/components/home/briefing-hot.pug';
import TagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';
import { host, } from 'settings/server/config.js';

header( document.getElementById( 'header' ) );

// Normal briefings
const announcementBriefing = document.getElementById( 'announcement__briefings' );
const languageId = Number( new URLSearchParams( window.location.search ).get( 'languageId' ) );
announcementBriefing.innerHTML += briefing( {
    id:      1,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
    tags:    [
        {
            id: TagUtils.getTagId( {
                tag:        'college',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'college',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
        {
            id: TagUtils.getTagId( {
                tag:        'speech',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'speech',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
        {
            id: TagUtils.getTagId( {
                tag:        'phd',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'phd',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
    ],
    UTILS: {
        url: UrlUtils.serverUrl( new UrlUtils( host, languageId ) ),
    },
} );
announcementBriefing.innerHTML += briefing( {
    id:      2,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '兩小段內文',
    tags:    [
        {
            id: TagUtils.getTagId( {
                tag:        'recruitment',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'recruitment',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
        {
            id: TagUtils.getTagId( {
                tag:        'faculty',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'faculty',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
        {
            id: TagUtils.getTagId( {
                tag:        'exhibition',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'exhibition',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
    ],
    UTILS: {
        url: UrlUtils.serverUrl( new UrlUtils( host, languageId ) ),
    },
} );
announcementBriefing.innerHTML += briefing( {
    id:      3,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
    tags:    [
        {
            id: TagUtils.getTagId( {
                tag:        'college',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'college',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
        {
            id: TagUtils.getTagId( {
                tag:        'speech',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'speech',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
        {
            id: TagUtils.getTagId( {
                tag:        'phd',
                languageId: LanguageUtils.getLanguageId( 'en-US' ),
            } ),
            name: TagUtils.getTagById( {
                tagId: TagUtils.getTagId( {
                    tag:        'phd',
                    languageId: LanguageUtils.getLanguageId( 'en-US' ),
                } ),
                languageId,
            } ),
        },
    ],
    UTILS: {
        url: UrlUtils.serverUrl( new UrlUtils( host, languageId ) ),
    },
} );

// Hot news briefings
const announcementBriefingHot = document.getElementById( 'announcement__briefings--hot-news' );
announcementBriefingHot.innerHTML += briefingHot( {
    briefings: [
        {
            id:      0,
            title:   '標題二',
            time:    '2018-2-2 | 15:02',
            excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
        },
        {
            id:      1,
            title:   '標題二',
            time:    '2018-2-2 | 15:02',
            excerpt: '兩小段內文',
        },
        {
            id:      2,
            title:   '標題二',
            time:    '2018-2-2 | 15:02',
            excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
        },
    ],
} );
