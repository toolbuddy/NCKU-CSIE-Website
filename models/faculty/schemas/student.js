const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const degreeUtils = require('../utils/degree.js');

const Student = faculty.define('student', {
    studentId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    studentAwardId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    degree: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: degreeUtils.defaultId,
    },
});

module.exports = Student;
