const Sequelize = require('sequelize');
const { faculty, } = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const AwardI18n = faculty.define( 'awardI18n', {
    awardId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    language: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: LanguageUtils.defaultLanguageId,
    },
    award: {
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
} );

module.exports = AwardI18n;
