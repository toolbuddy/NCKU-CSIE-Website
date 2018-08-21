/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/about/faculty-detail.min.css';
import header from 'static/src/js/components/common/header/index.js';
import detail from 'static/src/pug/components/about/faculty/details.pug';

document.getElementById( 'content' ).innerHTML = detail( {
    language: 'zh-TW',
    profile:  {
        name:     '教師名稱',
        title:    [
            '教授',
            '系主任',
        ],
        department: [
            '資訊系',
            '資訊所',
            '醫資所',
        ],
        domain: [
            '資料探勘',
            '機器學習',
        ],
    },
    education: {
        detail: [
            {
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                school:     '成功大學',
                department: '電機',
                degree:     '博士',
            },
            {
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                school:     '成功大學',
                department: '電機',
                degree:     '博士',
            },
        ],
    },
    experience: {
        detail: [
            {
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                school:     '成功大學',
                department: '電機',
                degree:     '博士',
            },
            {
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                school:     '成功大學',
                department: '電機',
                degree:     '博士',
            },
        ],
    },
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
} );
