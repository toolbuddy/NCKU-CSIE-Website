import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import degreeUtils from 'models/faculty/utils/degree.js';

const Student = faculty.define( 'student', {
    studentId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    studentAwardId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    degree: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: degreeUtils.defaultId,
    },
} );

export default Student;
