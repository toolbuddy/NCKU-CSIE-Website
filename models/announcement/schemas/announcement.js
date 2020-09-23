import Sequelize from 'sequelize';
import { announcement, } from 'models/common/utils/connect.js';

const Announcement = announcement.define( 'announcement', {
    announcementId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
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
        type:      Sequelize.BLOB( 'medium' ),
        allowNull: true,
        get () {
            if ( this.getDataValue( 'image' ) )
                return this.getDataValue( 'image' ).toString( 'base64' );
            return null;
        },
    },
}, {
    timestamps: true,
    createdAt:  'publishTime',
    updatedAt:  'updateTime',
} );

export default Announcement;
