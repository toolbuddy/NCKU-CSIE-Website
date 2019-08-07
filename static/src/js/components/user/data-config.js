import LanguageUtils from 'models/common/utils/language.js';
import degreeUtils from 'models/faculty/utils/degree.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';
import { editPageType, } from 'static/src/js/components/user/edit-page.js';
import nationUtils from 'models/faculty/utils/nation.js';
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
                nation:        0,
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
                degree: 0,
                nation: 0,
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
                degree: 0,
                nation: 0,
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
                award: 'ex. 國立成功大學教學傑出教師',
            },
            localTopic: {
                'award':         'award',
                'time-detail': 'Received Date',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '獎項',
            default: {
                award: 'ex. 國立成功大學教學傑出教師',
            },
            localTopic: {
                'award':         '獎項',
                'time-detail': '獲獎日期',
            },
        },
    },
    publication: {
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
            topic:   'publication',
            default: {
                authors:   'ex. 王小明, 黃小美',
                title:     '',
                category:  0,
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
                category:  0,
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

const dataEditPageConfig = Object.freeze( {
    profile: {
        name: [
            editPageType( {
                type:        'text',
                dbTableItem: 'name',
                i18n:        true,
            } ),
        ],
        officeAddress: [
            editPageType( {
                type:        'text',
                dbTableItem: 'officeAddress',
                i18n:        true,
            } ),
        ],
        labName: [
            editPageType( {
                type:        'text',
                dbTableItem: 'labName',
                i18n:        true,
            } ),
        ],
        labAddress:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'labAddress',
                i18n:        true,
            } ),
        ],
        labTel:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'labTel',
                i18n:        false,
            } ),
        ],
        labWeb:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'labWeb',
                i18n:        false,
            } ),
        ],
        officeTel: [
            editPageType( {
                type:        'text',
                dbTableItem: 'officeTel',
                i18n:        false,
            } ),
        ],
        email:    [
            editPageType( {
                type:        'text',
                dbTableItem: 'email',
                i18n:        false,
            } ),
        ],
        fax:    [
            editPageType( {
                type:        'text',
                dbTableItem: 'fax',
                i18n:        false,
            } ),
        ],
        personalWeb:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'personalWeb',
                i18n:        false,
            } ),
        ],
        nation: [
            editPageType( {
                type:         'dropdown',
                dbTableItem:  'nation',
                dropdownItem: nationUtils.i18n[ WebLanguageUtils.currentLanguageId ],
                util:         nationUtils,
            } ),
        ],
    },
    education: [
        editPageType(
            {
                type: 'time',
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'degree',
            }
        ),
        editPageType(
            {
                type:         'dropdown',
                dbTableItem:  'degree',
                dropdownItem: degreeUtils.i18n[ WebLanguageUtils.currentLanguageId ],
                util:         degreeUtils,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'nation',
            }
        ),
        editPageType(
            {
                type:         'dropdown',
                dbTableItem:  'nation',
                dropdownItem: nationUtils.i18n[ WebLanguageUtils.currentLanguageId ],
                util:         nationUtils,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'school',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'school',
                i18n:        true,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'major',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'major',
                i18n:        true,
            }
        ),
    ],
    experience: [
        editPageType(
            {
                type: 'time',
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'organization',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'organization',
                i18n:        true,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'department',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'department',
                i18n:        true,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'title',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'title',
                i18n:        true,
            }
        ),
    ],
    title: [
        editPageType(
            {
                type: 'time',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'title',
                i18n:        true,
            }
        ),
    ],
    specialty: [
        editPageType(
            {
                type:        'text',
                dbTableItem: 'specialty',
                i18n:        true,
            }
        ),
    ],
    award: [
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'time-detail',
            }
        ),
        editPageType(
            {
                type:         'timeDetail',
                dbTableYear:  'receivedYear',
                dbTableMonth: 'receivedMonth',
                dbTableDate:   'receivedDay',
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'award',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'award',
                i18n:        true,
            }
        ),
    ],
    publication: [
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'issueYear',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'issueYear',
                i18n:        false,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'category',
            }
        ),
        editPageType( {
            type:         'dropdown',
            dbTableItem:  'category',
            dropdownItem: publicationCategoryUtils.i18n[ WebLanguageUtils.currentLanguageId ],
            util:         publicationCategoryUtils,
        } ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'title',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'title',
                i18n:        true,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'authors',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'authors',
                i18n:        true,
            }
        ),
        editPageType(
            {
                type:        'checkbox',
                dbTableItem: 'international',
            }
        ),
        editPageType(
            {
                type:        'checkbox',
                dbTableItem: 'refereed',
            }
        ),
    ],
    conference: [
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'hostYear',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'hostYear',
                i18n:        false,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'conference',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'conference',
                i18n:        true,
            }
        ),
        editPageType(
            {
                type:        'localTopic',
                dbTableItem: 'title',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'title',
                i18n:        true,
            }
        ),
    ],
} );

const validationInfo = Object.freeze( {
    profile: {
        [ `name_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文姓名是必填欄位',
            },
        },
        [ `name_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '英文姓名是必填欄位',
            },
        },
        nation: {
            presence: {
                allowEmpty: false,
            },
        },
        email: {
            presence: {
                allowEmpty: true,
            },
            email: {
                message: 'email格式錯誤',
            },
        },
        fax: {
            presence: {
                allowEmpty: false,
                message:    '傳真號碼是必填欄位',
            },
            format: {
                pattern: '[0-9-()]+',
                message: '傳真格式錯誤',
            },
        },
        personalWeb: {
            presence: {
                allowEmpty: true,
            },
            url: {
                message:    '網址格式錯誤',
            },
        },
        [ `officeAddress_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文辦公室位置是必填欄位',
            },
        },
        [ `officeAddress_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `labAddress_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `labAddress_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `labName_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `labName_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        officeTel: {
            presence: {
                allowEmpty: false,
                message:    '辦公室電話是必填欄位',
            },
            format: {
                pattern: '[0-9-(),]+',
                message: '電話格式錯誤',
            },
        },
        labTel: {
            presence: {
                allowEmpty: false,
                message:    '實驗室電話是必填欄位',
            },
            format: {
                pattern: '[0-9-(),]+',
                message: '電話格式錯誤',
            },
        },
        labWeb: {
            presence: {
                allowEmpty: true,
            },
            url: {
                message: '網址格式錯誤',
            },
        },
    },
    title: {
        [ `title_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文職稱是必填欄位',
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        from: {
            presence: {
                allowEmpty: true,
            },
            numericality: {
                onlyInteger:       true,
                greaterThan:       1900,
                lessThanOrEqualTo: new Date().getFullYear(),
                message:           '年份應介於1900~現在',
            },
        },
        to: {
            presence: {
                allowEmpty: true,
            },
            numericality: {
                onlyInteger:       true,
                greaterThan:       1900,
                lessThanOrEqualTo: new Date().getFullYear(),
                message:           '年份應介於1900~現在',
            },
        },
    },
    specialty: {
        [ `specialty_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文專長領域是必填欄位',
            },
        },
        [ `specialty_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
    },
    education: {
        [ `school_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文學校是必填欄位',
            },
        },
        [ `school_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `major_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文主修是必填欄位',
            },
        },
        [ `major_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        degree: {
            presence: {
                allowEmpty: false,
            },
        },
        nation: {
            presence: {
                allowEmpty: false,
            },
        },
        from: {
            presence: {
                allowEmpty: false,
                message:    '年份是必填欄位',
            },
            numericality: {
                onlyInteger:       true,
                greaterThan:       1900,
                lessThanOrEqualTo: new Date().getFullYear(),
                message:           '年份應介於1900~現在',
            },
        },
        to: {
            presence: {
                allowEmpty: true,
            },
            numericality: {
                onlyInteger:       true,
                greaterThan:       1900,
                lessThanOrEqualTo: new Date().getFullYear(),
                message:           '年份應介於1900~現在',
            },
        },
    },
    experience: {
        [ `organization_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文任職單位是必填欄位',
            },
        },
        [ `organization_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `department_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `department_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文職稱是必填欄位',
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
        from: {
            presence: {
                allowEmpty: false,
                message:    '開始年份是必填欄位',
            },
            numericality: {
                onlyInteger:       true,
                greaterThan:       1900,
                lessThanOrEqualTo: new Date().getFullYear(),
                message:           '年份應介於1900~現在',
            },
        },
        to: {
            presence: {
                allowEmpty: true,
            },
            numericality: {
                onlyInteger:       true,
                greaterThan:       1900,
                lessThanOrEqualTo: new Date().getFullYear(),
                message:           '年份應介於1900~現在',
            },
        },
    },
} );

deepFreeze( dataI18n );
deepFreeze( dataEditPageConfig );
deepFreeze( validationInfo );

export { dataI18n, dataEditPageConfig, validationInfo, };
