const Sequelize = require('sequelize');
const {staff} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const BusinessI18n = staff.define('businessI18n', {
    businessId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    languageId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        defaultValue: LanguageUtils.defaultLanguageId,
    },
    business: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = BusinessI18n;
