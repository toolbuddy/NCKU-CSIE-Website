const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const PatentI18n = faculty.define('patentI18n', {
    patentId: {
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
    inventor: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    patentOwner: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    patent: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
});

module.exports = PatentI18n;
