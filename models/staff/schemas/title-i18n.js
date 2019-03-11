import Sequelize from 'sequelize';
import { staff, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const TitleI18n = staff.define( 'titleI18n', {
    profileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
    },
    titleId: {
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
    title: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
} );

export default TitleI18n;
