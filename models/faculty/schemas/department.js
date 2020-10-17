const Sequelize = require('sequelize');
const { faculty, } = require('../../common/utils/connect.js');
const departmentUtils = require('../utils/department.js');

const Department = faculty.define( 'department', {
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    type: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: departmentUtils.defaultId,
    },
} );

module.exports = Department;
