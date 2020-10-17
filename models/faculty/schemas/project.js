const Sequelize = require('sequelize');
const { faculty, } = require('../../common/utils/connect.js');
const projectCategoryUtils = require('../utils/project-category.js');

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

module.exports = Project;
