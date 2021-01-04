const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/technology-transfer-patent-columns.js');

const technologyTransferPatentColumnsUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = technologyTransferPatentColumnsUtils;
