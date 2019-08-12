import LanguageUtils from 'models/common/utils/language.js';
import deepFreeze from 'deep-freeze';

const dataI18n = Object.freeze( {
    profile: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic: {
                name:          'name',
                nation:        'naiton',
                officeAddress: 'office address',
                officeTel:     'office tel',
                labName:       'lab name',
                labAddress:    'lab address',
                labTel:        'lab tel',
                labWeb:        'lab web',
                email:         'email',
                personalWeb:   'personal web',
                fax:           'fax',
            },
            default: {
                name:          'ex. Sam Wang',
                officeAddress: 'ex. 65xxx, 12F, CSIE new building',
                officeTel:     'ex. 06-xxxxxxx,ext',
                labName:       'please input your lab name',
                labAddress:    'ex. 65xxx, 5F, CSIE new building',
                labTel:        'ex. 06-xxxxxxx,ext',
                labWeb:        'ex. http://your_web_site.com',
                email:         'ex. example@xxxxxxxx',
                personalWeb:   'ex. http://your_web_site.com',
                fax:           'please input your fax number',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic: {
                name:          '姓名',
                nation:        '國籍',
                officeAddress: '辦公室位置',
                officeTel:     '辦公室電話',
                labName:       '實驗室名稱',
                labAddress:    '實驗室位置',
                labTel:        '實驗室電話',
                labWeb:        '實驗室網站',
                email:         'email',
                personalWeb:   '個人網站',
                fax:           '傳真',
            },
            default: {
                name:          'ex. 王小明',
                officeAddress: 'ex. 資訊系新館 65xxx',
                officeTel:     'ex. 06-xxxxxxx,分機號碼',
                labName:       'ex. xxx實驗室',
                labAddress:    'ex. 資訊系新館 65xxx',
                labTel:        'ex. 06-xxxxxxx,分機號碼',
                labWeb:        'ex. http://your_web_site.com',
                email:         'ex. example@xxxxxxxx',
                personalWeb:   'ex. http://your_web_site.com',
                fax:           '請輸入您的傳真號碼',
            },
        },
    },
    title: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'title',
            default: {
                title:        'ex. Professor',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '職稱',
            default: {
                title:        'ex. 教授',
            },
        },
    },
    specialty: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'specialty',
            default: {
                specialty:     'ex. machine learning',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '專長領域',
            default: {
                specialty:     'ex. 機器學習',
            },
        },
    },
    education: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'education',
            default: {
                school:       'ex. Nation Cheng Kung University',
                major:        'ex. CSIE',
            },
            localTopic: {
                degree: 'degree',
                school: 'school',
                major:  'major',
                nation: 'nation',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '學歷',
            default: {
                school:       'ex. 國立成功大學',
                major:        'ex. 資訊工程學系',
            },
            localTopic: {
                degree: '學位',
                school: '學校',
                major:  '主修',
                nation: '國家',
            },
        },
    },
    experience: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'experience',
            default: {
                organization: 'ex. Nation Cheng Kung University',
                department:   'ex. CSIE',
                title:        'ex. Professor',
            },
            localTopic: {
                organization: 'organization',
                department:   'department',
                title:        'title',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '經歷',
            default: {
                organization: 'ex. 國立成功大學',
                department:   'ex. 資訊工程學系',
                title:        'ex. 教授',
            },
            localTopic: {
                organization: '任職單位',
                department:   '任職部門',
                title:        '職位',
            },
        },
    },
    award: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'award',
            default: {
                award:        'ex. 國立成功大學教學傑出教師',
                receivedYear: 'yyyy',
            },
            localTopic: {
                'award':         'award',
                'receivedYear': 'Received Year',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '獎項',
            default: {
                award:        'ex. 國立成功大學教學傑出教師',
                receivedYear: 'yyyy',
            },
            localTopic: {
                'award':         '獎項',
                'receivedYear': '獲獎年份',
            },
        },
    },
    project: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'project',
            default: {
                name:     '',
                support:  '',
            },
            localTopic: {
                name:     'name',
                support:  'support',
                category: 'category',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '專案',
            default: {
                name:     '',
                support:  '',
            },
            localTopic: {
                name:     '專案名稱',
                support:  '補助單位',
                category: '投稿對象',
            },
        },
    },
    publication: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'publication',
            default: {
                authors:   'ex. 王小明, 黃小美',
                title:     '',
                issueYear: 'yyyy',
            },
            localTopic: {
                authors:       'authors',
                title:         'title',
                category:      'category',
                issueYear:     'issue year',
                international: 'international',
                refereed:      'refereed',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   'publication',
            default: {
                authors:   'ex. 王小明, 黃小美',
                title:     '',
                issueYear: 'yyyy',
            },
            localTopic: {
                authors:       '作者',
                title:         '著作名稱',
                category:      '投稿對象',
                issueYear:     '發行年份',
                international: '國際級別',
                refereed:      '經過審查委員審核',
            },
        },
    },
    conference: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'conference',
            default: {
                'conference': '',
                'title':      '',
                'hostYear':   'yyyy',
            },
            localTopic: {
                'conference':         'conference',
                'title':      'title',
                'hostYear':   'Host Year',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '參與會議',
            default: {
                'conference': '',
                'title':      '',
                'hostYear':   'yyyy',
            },
            localTopic: {
                'conference':    '會議名稱',
                'title':         '職稱',
                'hostYear':   '舉行年份',
            },
        },
    },
    patent: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'patent',
            default: {
                'certificationNumber': '',
            },
            localTopic: {
                'applicationDate':     'application date',
                'certificationNumber': 'certification number',
                'expireDate':          'expire date',
                'issueDate':           'issue date',
                'nation':              'nation',
                'inventor':            'inventor',
                'patent':              'patent',
                'patentOwner':         'patent owner',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '專利',
            default: {
                'certificationNumber': '',
            },
            localTopic: {
                'applicationDate':     '申請日期',
                'certificationNumber': '證書號',
                'expireDate':          '到期日期',
                'issueDate':           '核准日期',
                'nation':              '專利國籍',
                'inventor':            '發明人',
                'patent':              '專利名稱',
                'patentOwner':         '專利權人',
            },
        },
    },
    editPage: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            button: {
                cancel: 'cancel',
                check:  'check',
            },
            topic: {
                add:    'add your ',
                update: 'update your ',
                delete: 'delete your ',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            button: {
                cancel: '取消',
                check:  '確定',
            },
            topic: {
                add:    '新增您的',
                update: '修改您的',
                delete: '刪除您的',
            },
        },
    },
    button: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            delete: 'delete',
            update:  'update',
            add:     'add',
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            delete: '刪除',
            update:  '變更',
            add:     '新增',
        },
    },
    time: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            from:    'from',
            to:      'to',
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            from:    '從',
            to:      '至',
        },
    },
} );

deepFreeze( dataI18n );
export default dataI18n;
