import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const ProjectI18n = faculty.define( 'projectI18n', {
    projectId: {
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
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
    support: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
} );

export default ProjectI18n;
