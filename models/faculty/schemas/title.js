import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';

const Title = faculty.define( 'title', {
    titleId: {
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
    from: {
        type:      Sequelize.DATEONLY,
        allowNull: true,
    },
    to: {
        type:      Sequelize.DATEONLY,
        allowNull: true,
    },
} );

export default Title;
