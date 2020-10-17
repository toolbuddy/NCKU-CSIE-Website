const Sequelize = require('sequelize');
const { faculty, } = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const ProfileI18n = faculty.define( 'profileI18n', {
    profileId: {
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
    name: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
    officeAddress: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
    labName: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
    labAddress: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
} );

module.exports = ProfileI18n;
