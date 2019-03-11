import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'journal',
    'conference',
    'workshop',
];

const defaultOption = 'journal';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        journal:    'journal',
        conference: 'conference',
        workshop:   'workshop',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        journal:    '期刊',
        conference: '會議',
        workshop:   '工作坊',
    },
};

deepFreeze( i18n );
deepFreeze( map );

export default {
    defaultOption,
    i18n,
    map,
};

export {
    defaultOption,
    i18n,
    map,
};
