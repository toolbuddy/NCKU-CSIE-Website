/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/about/faculty-detail.min.css';
import header from 'static/src/js/components/common/header/index.js';
import detail from 'static/src/pug/components/about/faculty/details.pug';

document.getElementById( 'content' ).innerHTML = detail( {
    profile: {
        language: 'zh-TW',
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
} );
