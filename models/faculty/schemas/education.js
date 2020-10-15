const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');
const nationUtils = require('models/faculty/utils/nation.js');
const degreeUtils = require('models/faculty/utils/degree.js');

const Education = faculty.define('education', {
    educationId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    profileId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    nation: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: nationUtils.defaultId,
    },
    degree: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: degreeUtils.defaultId,
    },
    from: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    to: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
    },
});

module.exports = Education;
