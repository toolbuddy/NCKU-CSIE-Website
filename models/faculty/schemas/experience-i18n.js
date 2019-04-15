import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const ExperienceI18n = faculty.define( 'experienceI18n', {
    experienceId: {
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
    organization: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
    department: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
    title: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
} );

export default ExperienceI18n;
