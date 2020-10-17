const Sequelize = require('sequelize');
const {staff} = require('../../common/utils/connect.js');

const Title = staff.define('title', {
    titleId: {
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
});

module.exports = Title;
