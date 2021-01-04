const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/technology-transfer-columns.js');

const technologyTransferColumnsUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = technologyTransferColumnsUtils;
