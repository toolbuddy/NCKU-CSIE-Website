import Sequelize from 'sequelize';
import { staff, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const BusinessI18n = staff.define( 'businessI18n', {
    profileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
    },
    businessId: {
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
    business: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
} );

export default BusinessI18n;
