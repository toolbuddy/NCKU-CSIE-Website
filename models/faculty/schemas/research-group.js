import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import ResearchGroupUtils from 'models/faculty/utils/research-group.js';

const ResearchGroup = faculty.define( 'researchGroup', {
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    type: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: ResearchGroupUtils.defaultResearchGroupId,
    },
} );

export default ResearchGroup;
