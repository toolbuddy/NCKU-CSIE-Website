const Sequelize = require('sequelize');
const {faculty} = require('../../common/utils/connect.js');
const nationUtils = require('../utils/nation.js');

const Patent = faculty.define('patent', {
    patentId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    profileId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    nation: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: nationUtils.defaultId,
    },
    certificationNumber: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    applicationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    issueDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    expireDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
});

module.exports = Patent;
