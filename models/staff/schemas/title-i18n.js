const Sequelize = require('sequelize');
const {staff} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const TitleI18n = staff.define('titleI18n', {
    titleId: {
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
    title: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = TitleI18n;
