import Sequelize from 'sequelize';
import { announcement, } from 'models/common/utils/connect.js';

const Announcement = announcement.define( 'announcement', {
    announcementId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    publishTime: {
        type:      Sequelize.DATE,
        allowNull: true,
    },
    updateTime: {
        type:      Sequelize.DATE,
        allowNull: true,
    },
    author: {
        type:      Sequelize.INTEGER,
        allowNull: true,
    },
    views: {
        type:         Sequelize.INTEGER.UNSIGNED,
        allowNull:    true,
        defaultValue: '0',
    },
    isPinned: {
        type:         Sequelize.BOOLEAN,
        allowNull:    true,
        defaultValue: '0',
    },
    isPublished: {
        type:         Sequelize.BOOLEAN,
        allowNull:    true,
        defaultValue: '1',
    },
    image: {
        type:      Sequelize.BLOB('medium'),
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: 'publishTime',
    updatedAt: 'updateTime',
});

export default Announcement;
