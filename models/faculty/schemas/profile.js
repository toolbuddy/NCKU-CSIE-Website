import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import NationUtils from 'models/faculty/utils/nation.js';

const Profile = faculty.define( 'profile', {
    profileId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    fax: {
        type:         Sequelize.STRING( 20 ),
        allowNull:    false,
        defaultValue: '2747076',
    },
    email: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: true,
    },
    personalWeb: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: true,
    },
    nation: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: NationUtils.defaultNationId,
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
    labTel: {
        type:         Sequelize.STRING( 30 ),
        allowNull:    false,
        defaultValue: '06-2757575,62500',
    },
    labWeb: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: true,
    },
} );

export default Profile;
