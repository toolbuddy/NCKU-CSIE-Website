const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/business.js');

const businessUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = businessUtils;
