/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/about/faculty-detail.min.css';
import header from 'static/src/js/components/common/header/index.js';
import detail from 'static/src/pug/components/about/faculty/details.pug';

document.getElementById( 'content' ).innerHTML = detail(
    {
        language: 'zh-TW',
        award:                       [
            { time: '2014', award: 'award', },
            { time: '2016', award: 'award', },
            { time: '2018', award: 'award', },
        ],
        publicationAccepted:       [ 'Publication',
            'Publication',
            'Publication', ],
        publicationRefereed:       [ 'Publication',
            'Publication',
            'Publication', ],
        publicationInternational:  [ 'Publication',
            'Publication',
            'Publication', ],
        publicationDomestic:       [ 'Publication',
            'Publication',
            'Publication', ],
        studentdoc:                  [ 'd1',
            'd2',
            'd3',
            'd4', ],
        studentmas:                  [ 'm1',
            'm2',
            'm3',
            'm4', ],
        studentAward:              [ '1',
            '2',
            '3', ],
        studentMeeting:            [ '1',
            '2',
            '3', ],
    }
);

