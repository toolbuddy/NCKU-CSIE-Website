const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/reset-password');

const resetPasswordUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = resetPasswordUtils;
