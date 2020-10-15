const departmentUtils = require('models/faculty/utils/department.js');

const DepartmentValidationConstraints = {
    type: {
        presence: true,
        type: {
            type: value => departmentUtils.isSupportedId(value),
        },
    },
};

module.exports = DepartmentValidationConstraints;
