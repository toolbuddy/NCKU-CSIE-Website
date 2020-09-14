import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const SpecialtyI18n = faculty.define( 'specialtyI18n', {
    specialtyId: {
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
    specialty: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
} );

export default SpecialtyI18n;
