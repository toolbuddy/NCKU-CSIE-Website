const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');
const LanguageUtils = require('models/common/utils/language.js');

const TechnologyTransferI18n = faculty.define('technologyTransferI18n', {
    technologyTransferId: {
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
    technology: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    authorizingParty: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    authorizedParty: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
});

module.exports = TechnologyTransferI18n;
