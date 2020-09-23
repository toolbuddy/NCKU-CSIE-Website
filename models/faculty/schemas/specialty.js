import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';

const Specialty = faculty.define( 'specialty', {
    specialtyId: {
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
} );

export default Specialty;
