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
    patent: {
        tables: [
            {
                type:       'A',
                name:       '機台維修系統與方法',
                belong:     '國立成功大學',
                school:     '成功大學',
                inventor:   '鄭方田',
                id:         '審查中',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
            },
            {
                type:       'A',
                name:       '機台維修系統與方法',
                belong:     '國立成功大學',
                school:     '成功大學',
                inventor:   '鄭方田',
                id:         '審查中',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
            },
        ],
    },
    transfer: {
        tables: [
            {
                id:         '1',
                techName:   '全自動虛擬測量',
                patentName: '專利名稱',
                authority:  '成功大學',
                accept:     '群創',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
            },
            {
                id:         '1',
                techName:   '全自動虛擬測量',
                patentName: '專利名稱',
                authority:  '成功大學',
                accept:     '群創',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
            },
        ],
    },
    research: {
        tableTech: [
            {
                name:      '子計畫',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                authority:  '科技部',
            },
            {
                name:      '子計畫',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                authority:  '科技部',
            },
        ],
        tableNormal: [
            {
                name:      '子計畫',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                authority:  '科技部',
            },
            {
                name:      '子計畫',
                timeBegin:  '2016.09.11',
                timeEnd:    '2016.09.12',
                authority:  '科技部',
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
