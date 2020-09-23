import Sequelize from 'sequelize';
import { staff, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const ProfileI18n = staff.define( 'profileI18n', {
    profileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
    },
    language: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: LanguageUtils.defaultLanguageId,
    },
    name: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
    officeAddress: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
} );

export default ProfileI18n;
