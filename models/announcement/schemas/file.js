import Sequelize from 'sequelize';
import { announcement, } from 'models/common/utils/connect.js';

const File = announcement.define( 'file', {
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

export default File;
