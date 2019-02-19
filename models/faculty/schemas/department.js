import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import DepartmentUtils from 'models/faculty/utils/department.js';

const Department = faculty.define( 'department', {
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    type: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: DepartmentUtils.defaultDepartmentId,
    },
} );

export default Department;
