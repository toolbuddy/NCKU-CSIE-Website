const Sequelize = require('sequelize');
const {announcement} = require('models/common/utils/connect.js');
const tagUtils = require('models/announcement/utils/tag.js');

const Tag = announcement.define('tag', {
    announcementId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    tagId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: tagUtils.defaultId,
        primaryKey: true,
    },
});

module.exports = Tag;
