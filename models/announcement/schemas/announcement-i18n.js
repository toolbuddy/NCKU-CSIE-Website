const Sequelize = require('sequelize');
const {announcement} = require('../../common/utils/connect.js');
const LanguageUtils = require('../../common/utils/language.js');

const AnnouncementI18n = announcement.define('announcementI18n', {
    announcementId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    languageId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: LanguageUtils.defaultLanguageId,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
});

module.exports = AnnouncementI18n;
