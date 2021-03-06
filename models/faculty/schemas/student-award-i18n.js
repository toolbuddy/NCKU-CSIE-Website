const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const StudentAwardI18n = faculty.define('studentAwardI18n', {
    studentAwardId: {
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
    award: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
});

module.exports = StudentAwardI18n;
