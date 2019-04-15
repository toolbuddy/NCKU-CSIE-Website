import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const PublicationI18n = faculty.define( 'publicationI18n', {
    publicationId: {
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
    title: {
        type:      Sequelize.STRING( 500 ),
        allowNull: false,
    },
    authors: {
        type:      Sequelize.STRING( 500 ),
        allowNull: false,
    },
} );

export default PublicationI18n;
