const Sequelize = require('sequelize');
const {faculty} = require('models/common/utils/connect.js');
const researchGroupUtils = require('models/faculty/utils/research-group.js');

const ResearchGroup = faculty.define('researchGroup', {
    profileId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        defaultValue: researchGroupUtils.defaultId,
    },
});

module.exports = ResearchGroup;
