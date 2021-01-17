const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'title',
    'url',
    'image',
];

const defaultOption = 'title';

const i18n = {
    [LanguageUtils.getLanguageId('zh-TW')]: {
        title: '標題',
        url: '新聞連結',
        image: '圖片',
    },
    [LanguageUtils.getLanguageId('en-US')]: {
        title: 'title',
        url: 'url',
        image: 'image',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

