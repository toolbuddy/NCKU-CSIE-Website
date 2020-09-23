import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const TechnologyTransferPatentI18n = faculty.define( 'technologyTransferPatentI18n', {
    technologyTransferPatentId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    language: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: LanguageUtils.defaultLanguageId,
    },
    patent: {
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
} );

export default TechnologyTransferPatentI18n;
