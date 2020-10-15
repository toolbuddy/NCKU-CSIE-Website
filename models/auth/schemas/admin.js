const Sequelize = require('sequelize');
const {user} = require('../../common/utils/connect.js');

const Admin = user.define('admin', {
    userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    account: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    role: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
    },
    roleId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
    },

});

module.exports = Admin;
