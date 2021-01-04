const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const SpecialtyI18n = faculty.define('specialtyI18n', {
    specialtyId: {
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
    specialty: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = SpecialtyI18n;
