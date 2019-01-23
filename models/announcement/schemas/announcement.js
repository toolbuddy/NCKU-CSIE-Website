import Sequelize from 'sequelize';
import { announcement, } from 'models/utils/connect.js';

const Announcement = announcement.define( 'announcement', {
    announcementId: {
        type:          Sequelize.INTEGER( 10 ).UNSIGNED,
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
        type:      Sequelize.INTEGER( 11 ),
        allowNull: true,
    },
    views: {
        type:         Sequelize.INTEGER( 32 ).UNSIGNED,
        allowNull:    true,
        defaultValue: '0',
    },
    isPinned: {
        type:         Sequelize.INTEGER( 1 ),
        allowNull:    true,
        defaultValue: '0',
    },
    isPublished: {
        type:         Sequelize.INTEGER( 1 ),
        allowNull:    true,
        defaultValue: '1',
    },
} );

export default Announcement;
