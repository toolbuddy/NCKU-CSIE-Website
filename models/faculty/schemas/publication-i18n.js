const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const PublicationI18n = faculty.define('publicationI18n', {
    publicationId: {
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
    title: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },
    authors: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },
});

module.exports = PublicationI18n;
