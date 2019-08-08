import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import deepFreeze from 'deep-freeze';

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
    award: {
        receivedYear: {
            presence:  {
                allowEmpty: false,
                message:    '年份不可為空',
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份應大於1970',
            },
        },
        receivedMonth: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 12,
                message:           '月份格式錯誤',
            },
        },
        receivedDay: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 31,
                message:           '日期格式錯誤',
            },
        },
        [ `award_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '中文獎項是必填欄位',
            },
        },
        [ `award_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
        },
    },
    conference: {
        hostYear: {
            presence:     {
                allowEmpty: false,
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份格式錯誤',
            },
        },
        [ `conference_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence:     {
                allowEmpty: false,
                message:    '中文會議名稱不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `conference_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence:     {
                allowEmpty: false,
                message:    '英文會議名稱不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence:     {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence:     {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
    },
    publication: {
        issueYear: {
            presence: {
                allowEmpty: true,
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份格式不正確',
            },
        },
        issueMonth: {
            presence:  {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 12,
                message:           '月份格式不正確',
            },
        },
        category: {
            presence: {
                allowEmpty: false,
            },
        },
        international: {
            presence: {
                allowEmpty: false,
            },
        },
        refereed: {
            presence: {
                allowEmpty: false,
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence:     {
                allowEmpty: false,
                message:    '標題不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `title_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence:     {
                allowEmpty: false,
                message:    '標題不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `authors_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence:     {
                allowEmpty: false,
                message:    '作者不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `authors_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence:     {
                allowEmpty: false,
                message:    '作者不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
    },
    patent: {
        nation: {
            presence: {
                allowEmpty: false,
            },
        },
        certificationNumber: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 100,
            },
        },
        applicationYear: {
            presence:  {
                allowEmpty: true,
                message:    '年份不可為空',
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份應大於1970',
            },
        },
        applicationMonth: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 12,
                message:           '月份格式錯誤',
            },
        },
        applicationDay: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 31,
                message:           '日期格式錯誤',
            },
        },
        expireYear: {
            presence:  {
                allowEmpty: true,
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份應大於1970',
            },
        },
        expireMonth: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 12,
                message:           '月份格式錯誤',
            },
        },
        expireDay: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 31,
                message:           '日期格式錯誤',
            },
        },
        issueYear: {
            presence:  {
                allowEmpty: true,
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份應大於1970',
            },
        },
        issueMonth: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 12,
                message:           '月份格式錯誤',
            },
        },
        issueDay: {
            presence:     {
                allowEmpty: true,
            },
            numericality: {
                greaterThan:       0,
                lessThanOrEqualTo: 31,
                message:           '日期格式錯誤',
            },
        },
        [ `inventor_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
        [ `inventor_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
        [ `patentOwner_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
        [ `patentOwner_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
        [ `patent_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '專利名稱不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `patent_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '專利名稱不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
    },
    project: {
        from: {
            presence: {
                allowEmpty: false,
                message:    '開始時間不可為空',
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份格式不正確',
            },
        },
        to: {
            presence:  {
                allowEmpty: true,
            },
            numericality: {
                greaterThanOrEqualTo: 1970,
                message:              '年份格式不正確',
            },
        },
        category: {
            presence: {
                allowEmpty: true,
            },
        },
        [ `name_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '專案名稱不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `name_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: false,
                message:    '專案名稱不可為空',
            },
            length:   {
                maximum: 300,
            },
        },
        [ `support_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
        [ `support_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
            presence: {
                allowEmpty: true,
            },
            length:   {
                maximum: 300,
            },
        },
    },
} );

deepFreeze( validationInfo );
export default ( validationInfo );
