import LanguageUtils from 'models/common/utils/language.js';
import degreeUtils from 'models/faculty/utils/degree.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { editPageType, } from 'static/src/js/components/user/edit-page.js';
import nationUtils from 'models/faculty/utils/nation.js';

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
                officeTel:     'ex. 06-xxxxxxx',
                labName:       'please input your lab name',
                labAddress:    'ex. 65xxx, 5F, CSIE new building',
                labTel:        'ex. 06-xxxxxxx',
                labWeb:        'ex. https//xxxxxxxxx',
                email:         'ex. example@xxxxxxxx',
                personalWeb:   'ex. https//xxxxxxxxx',
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
                officeTel:     'ex. 06-xxxxxxx',
                labName:       'ex. xxx實驗室',
                labAddress:    'ex. 資訊系新館 65xxx',
                labTel:        'ex. 06-xxxxxxx',
                labWeb:        'ex. https//xxxxxxxxx',
                email:         'ex. example@xxxxxxxx',
                personalWeb:   'ex. https//xxxxxxxxx',
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
                school:       'ex. Nation Cheng Kung University',
                major:        'ex. CSIE',
            },
            localTopic: {
                degree: 'degree',
                school: 'school',
                major:  'major',
            },
        },
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
            topic:   '學歷',
            default: {
                degree: 0,
                school:       'ex. 國立成功大學',
                major:        'ex. 資訊工程學系',
            },
            localTopic: {
                degree: '學位',
                school: '學校',
                major:  '主修',
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
                dataType:    'text',
                required:    true,
                i18n:        true,
            } ),
        ],
        officeAddress: [
            editPageType( {
                type:        'text',
                dbTableItem: 'officeAddress',
                dataType:    'text',
                required:    false,
                i18n:        true,
            } ),
        ],
        labName: [
            editPageType( {
                type:        'text',
                dbTableItem: 'labName',
                dataType:    'text',
                required:    false,
                i18n:        true,
            } ),
        ],
        labAddress:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'labAddress',
                dataType:    'text',
                required:    false,
                i18n:        true,
            } ),
        ],
        labTel:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'labTel',
                dataType:    'tel',
                required:    false,
                i18n:        false,
            } ),
        ],
        labWeb:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'labWeb',
                dataType:    'url',
                required:    false,
                i18n:        false,
            } ),
        ],
        officeTel: [
            editPageType( {
                type:        'text',
                dbTableItem: 'officeTel',
                dataType:    'tel',
                required:    false,
                i18n:        false,
            } ),
        ],
        email:    [
            editPageType( {
                type:        'text',
                dbTableItem: 'email',
                dataType:    'email',
                required:    true,
                i18n:        false,
            } ),
        ],
        fax:    [
            editPageType( {
                type:        'text',
                dbTableItem: 'fax',
                dataType:    'tel',
                required:    false,
                i18n:        false,
            } ),
        ],
        personalWeb:  [
            editPageType( {
                type:        'text',
                dbTableItem: 'personalWeb',
                dataType:    'url',
                required:    false,
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
                dbTableItem: 'school',
            }
        ),
        editPageType(
            {
                type:        'text',
                dbTableItem: 'school',
                dataType:    'text',
                required:    true,
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
                dataType:    'text',
                required:    true,
                i18n:        true,
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
                dataType:     'text',
                dropdownItem: degreeUtils.i18n[ WebLanguageUtils.currentLanguageId ],
                util:         degreeUtils,
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
                dataType:    'text',
                required:    true,
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
                dataType:    'text',
                required:    false,
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
                dataType:    'text',
                required:    false,
                i18n:        true,
            }
        ),
    ],
    title: [
        editPageType(
            {
                type:        'text',
                dbTableItem: 'title',
                dataType:    'text',
                required:    true,
                i18n:        true,
            }
        ),
    ],
    specialty: [
        editPageType(
            {
                type:        'text',
                dbTableItem: 'specialty',
                dataType:    'text',
                required:    true,
                i18n:        true,
            }
        ),
    ],
} );

export { dataI18n, dataEditPageConfig, };
