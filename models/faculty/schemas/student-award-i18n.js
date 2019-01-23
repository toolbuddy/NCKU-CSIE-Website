import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const StudentAwardI18n = faculty.define( 'studentAwardI18n', {
    studentAwardId: {
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

export default StudentAwardI18n;
