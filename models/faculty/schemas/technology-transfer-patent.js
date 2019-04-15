import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';

const TechnologyTransferPatent = faculty.define( 'technologyTransferPatent', {
    technologyTransferId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    technologyTransferPatentId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
} );

export default TechnologyTransferPatent;
