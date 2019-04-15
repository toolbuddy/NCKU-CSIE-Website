import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'general',
    'nsc',
];

const defaultOption = 'general';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        general: 'General Projects',
        nsc:     'National Science Council Projects',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        general: '一般建教案',
        nsc:     '國科會計劃',
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
