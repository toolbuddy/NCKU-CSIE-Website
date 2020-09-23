import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

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

export default ProfileI18n;
