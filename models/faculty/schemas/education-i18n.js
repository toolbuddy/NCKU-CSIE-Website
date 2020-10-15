const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');
const LanguageUtils = require('models/common/utils/language.js');

const EducationI18n = faculty.define('educationI18n', {
    educationId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    language: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        defaultValue: LanguageUtils.defaultLanguageId,
    },
    school: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    major: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = EducationI18n;
