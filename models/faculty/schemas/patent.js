import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import NationUtils from 'models/faculty/utils/nation.js';

const Patent = faculty.define( 'patent', {
    patentId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
    },
    nation: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: NationUtils.defaultNationId,
    },
    certificationNumber: {
        type:      Sequelize.STRING( 100 ),
        allowNull: true,
    },
    applicationDate: {
        type:      Sequelize.DATEONLY,
        allowNull: true,
    },
    issueDate: {
        type:      Sequelize.DATEONLY,
        allowNull: true,
    },
    expireDate: {
        type:      Sequelize.DATEONLY,
        allowNull: true,
    },
} );

export default Patent;
