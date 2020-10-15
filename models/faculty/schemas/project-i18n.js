const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const ProjectI18n = faculty.define('projectI18n', {
    projectId: {
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
    name: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    support: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
});

module.exports = ProjectI18n;
