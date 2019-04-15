import Sequelize from 'sequelize';
import { staff, } from 'models/common/utils/connect.js';

const Profile = staff.define( 'profile', {
    profileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    email: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: true,
    },
    photo: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: true,
    },
    officeTel: {
        type:         Sequelize.STRING( 30 ),
        allowNull:    false,
        defaultValue: '06-2757575,62500',
    },
    order: {
        type:         Sequelize.SMALLINT.UNSIGNED,
        allowNull:    false,
        defaultValue: 1,
    },
} );

export default Profile;
