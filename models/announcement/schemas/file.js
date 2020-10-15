const Sequelize = require('sequelize');
const {announcement} = require('models/common/utils/connect.js');

const File = announcement.define('file', {
    fileId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    announcementId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(2083),
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING(2083),
        allowNull: false,
    },
});

module.exports = File;
