const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');

const StudentAward = faculty.define('studentAward', {
    studentAwardId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    profileId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    receivedYear: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
    },
});

module.exports = StudentAward;
