const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'elife',
    'communication',
    'data',
    'multimedia',
    'architecture',
    'biomedical',
    'manufacturing',
];

const defaultOption = 'general';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        elife: 'E-life Digital Technology and Software Technology',
        communication: 'Computation, Communication and Network',
        data: 'Data and Knowledge Engineering',
        multimedia: 'Multimedia',
        architecture: 'Architecture and Embedded System',
        biomedical: 'Biomedical Engineering',
        manufacturing: 'Manufacturing Engineering',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        elife: '數位生活科技與軟體技術',
        communication: '計算通訊與網路',
        data: '資料與知識工程',
        multimedia: '多媒體',
        architecture: '架構與嵌入式系統',
        biomedical: '生醫工程',
        manufacturing: '製造工程',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

