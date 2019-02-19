import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const EducationI18n = faculty.define( 'educationI18n', {
    educationId: {
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
    school: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
    major: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
} );

export default EducationI18n;
