const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/student-columns.js');

const studentColumnsUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = studentColumnsUtils;
