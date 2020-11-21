const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const ConferenceI18n = faculty.define('conferenceI18n', {
    conferenceId: {
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
    conference: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    title: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
});

module.exports = ConferenceI18n;
