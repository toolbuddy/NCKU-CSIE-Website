import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';

const Conference = faculty.define( 'conference', {
    conferenceId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
        unique:        true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
    },
    hostYear: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
    },
} );

export default Conference;
