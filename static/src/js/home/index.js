/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import header from 'static/src/js/components/common/header/index.js';
import briefing from 'static/src/pug/components/announcement/briefing.pug';
import briefingHot from 'static/src/pug/components/home/briefing-hot.pug';

// Normal briefings
const announcementBriefing = document.getElementById( 'announcement__briefings' );
announcementBriefing.innerHTML += briefing( {
    id:      0,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
    tags:    [
        'college',
        'speech',
        'phd',
    ],
} );
announcementBriefing.innerHTML += briefing( {
    id:      1,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '兩小段內文',
    tags:    [
        'recruitment',
        'faculty',
        'exhibition',
    ],
} );
announcementBriefing.innerHTML += briefing( {
    id:      2,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
    tags:    [
        'college',
        'speech',
        'phd',
    ],
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
