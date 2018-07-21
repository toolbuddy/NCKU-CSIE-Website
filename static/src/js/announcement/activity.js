/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'cssComponent/announcement/activity.min.css';
import filter from 'jsComponent/announcement/filter.js';
import briefing from 'pugComponent/announcement/briefing.pug';

filter( 'all' );

// Top briefings
const announcementBriefingTop = document.getElementById( 'announcement__brefings--top' );
announcementBriefingTop.innerHTML += briefing( {
    id:      0,
    title:   '107學年度碩士班 備取生報到注意事項及名單(資工所/醫資所)',
    time:    '2018-2-2 | 15:02',
    excerpt: '利用一個輕鬆有趣的方式，幫助您遠離網路成癮困擾，美幫您希望有....',
    tags:    [ 'college',
        'speech',
        'internship', ],
} );
announcementBriefingTop.innerHTML += briefing( {
    id:      0,
    title:   '107學年度碩士班 備取生報到注意事項及名單(資工所/醫資所)',
    time:    '2018-2-2 | 15:02',
    excerpt: '利用一個輕鬆有趣的方式，幫助您遠離網路成癮困擾，美幫您希望有....',
    tags:    [ 'master',
        'speech',
        'course', ],
} );

// Normal briefings
const announcementBriefing = document.getElementById( 'announcement__brefings' );
announcementBriefing.innerHTML += briefing( {
    id:      0,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文一小段內文',
    tags:    [ 'college',
        'speech',
        'internatinal', ],
} );
announcementBriefing.innerHTML += briefing( {
    id:      1,
    title:   '標題二',
    time:    '2018-2-2 | 15:02',
    excerpt: '兩小段內文',
    tags:    [ 'recruitment',
        'teacher',
        'exhibition', ],
} );
