const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');
const LanguageUtils = require('models/common/utils/language.js');

const TechnologyTransferPatentI18n = faculty.define('technologyTransferPatentI18n', {
    technologyTransferPatentId: {
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
    patent: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
});

module.exports = TechnologyTransferPatentI18n;
