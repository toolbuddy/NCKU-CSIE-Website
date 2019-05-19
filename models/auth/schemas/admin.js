import Sequelize from 'sequelize';
import { user, } from 'models/common/utils/connect.js';

const Admin = user.define( 'admin', {
    userId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        primaryKey:    true,
        allowNull:     false,
        autoIncrement: true,
    },
    account: {
        type:       Sequelize.STRING( 20 ),
        allowNull:  false,
        unique:    true,
    },
    password: {
        type:       Sequelize.STRING( 20 ),
        allowNull:  false,
    },
    role: {
        type:         Sequelize.INTEGER.UNSIGNED,
        allowNull:    false,
        defaultValue: '0',
    },
    sid: {
        type:       Sequelize.STRING( 45 ),
        allowNull:  true,
        unique:    true,
    },
    isValid: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: '1',
    },

} );

export default Admin;
