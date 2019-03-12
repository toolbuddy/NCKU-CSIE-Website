import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';

const Project = faculty.define( 'project', {
    projectId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
    },
    from: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    to: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
    },
    category: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: projectCategoryUtils.defaultId,
    },
} );

export default Project;
