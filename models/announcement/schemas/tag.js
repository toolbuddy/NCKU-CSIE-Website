import Sequelize from 'sequelize';
import { announcement, } from 'models/utils/connect.js';

const Tag = announcement.define( 'tag', {
    announcementId: {
        type:       Sequelize.INTEGER( 10 ).UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    type: {
        type:         Sequelize.INTEGER( 11 ),
        allowNull:    false,
        defaultValue: '0',
        primaryKey:   true,
    },
} );

export default Tag;
