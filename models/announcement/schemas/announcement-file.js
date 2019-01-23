import Sequelize from 'sequelize';
import { announcement, } from 'models/utils/connect.js';

const AnnouncementFile = announcement.define( 'announcementFile', {
    announcementId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    fileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
} );

export default AnnouncementFile;
