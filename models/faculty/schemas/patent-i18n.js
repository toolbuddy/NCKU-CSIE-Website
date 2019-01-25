import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const PatentI18n = faculty.define( 'patentI18n', {
    patentId: {
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
    inventor: {
        type:      Sequelize.STRING( 300 ),
        allowNull: true,
    },
    patentOwner: {
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
    patent: {
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
} );

export default PatentI18n;
