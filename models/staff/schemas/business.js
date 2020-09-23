import Sequelize from 'sequelize';
import { staff, } from 'models/common/utils/connect.js';

const Business = staff.define( 'business', {
    businessId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
} );

export default Business;
