const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/degree.js');

const degreeUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = degreeUtils;
