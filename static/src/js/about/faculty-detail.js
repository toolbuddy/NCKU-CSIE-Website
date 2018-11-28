/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import header from 'static/src/js/components/common/header/index.js';
import detail from 'static/src/pug/components/about/faculty/details.pug';

document.getElementById( 'content' ).innerHTML = detail( {
    language: 'zh-TW',
    profile:  {
        name:     '高宏宇',
        title:    [
            '教授',
            '系主任',
        ],
        office:     '資訊系新館大樓12F 65C11',
        lab:    {
            name:     '智慧知識管理實驗室',
            location: '資訊系館新大樓9F 65903 室',
        },
        email:      'email@gmail.com',
        phone:      '0912345678',
        department: [
            '資訊系',
            '資訊所',
            '醫資所',
        ],
        website:    'https://www.google.com.tw/',
        domain:  [
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
    publicationAccepted:       [ 'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation',
        'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature',
        'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature', ],
    publicationRefereed:       [ 'PubTator: a Web-based text mining tool for assisting Biocuration',
        'PubTator: a Web-based text mining tool for assisting Biocuration',
        'PubTator: a Web-based text mining tool for assisting Biocuration', ],
    publicationInternational:  [ 'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation ',
        'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature',
        'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature', ],
    publicationDomestic:       [ 'PubTator: a Web-based text mining tool for assisting Biocuration',
        'PubTator: a Web-based text mining tool for assisting Biocuration',
        'PubTator: a Web-based text mining tool for assisting Biocuration', ],
    studentdoc:                  [ '博士生1',
        '博士生2',
        '博士生3',
        '博士生4', ],
    studentmas:                  [ '碩士生1',
        '碩士生2',
        '碩士生3',
        '碩士生4', ],
    studentAward:              [ 'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation',
        'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature',
        'A semi-supervised, weighted pattern-learning approach for extraction of gene regulation relationships from scientific literature', ],
    studentMeeting:            [ 'Award Chair of 2017 IEEE Conference on Robotics and Automation (ICRA 2017)(2017)',
        'Award Chair of The twelfth annual IEEE Conference on Automation Science and Engineering ( CASE 2014)(2016)',
        'Program Chair of The tenth annual IEEE Conference on Automation Science and Engineering ( CASE 2014)(2014)', ],
} );
