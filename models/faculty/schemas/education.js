import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import NationUtils from 'models/faculty/utils/nation.js';
import DegreeUtils from 'models/faculty/utils/degree.js';

const Education = faculty.define( 'education', {
    educationId: {
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
    degree: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: DegreeUtils.defaultDegreeId,
    },
    from: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    to: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
    },
} );

export default Education;
