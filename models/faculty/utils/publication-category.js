const I18nUtils = require('../../common/utils/i18n.js');
const { defaultOption, i18n, map, } = require('../maps/publication-category.js');

const publicationCategoryUtils = new I18nUtils( {
    defaultOption,
    i18n,
    map,
} );

module.exports = publicationCategoryUtils;
