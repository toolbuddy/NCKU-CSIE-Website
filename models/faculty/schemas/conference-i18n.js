import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const ConferenceI18n = faculty.define( 'conferenceI18n', {
    conferenceId: {
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
    conference: {
        type:      Sequelize.STRING( 300 ),
        allowNull: true,
    },
    title: {
        type:      Sequelize.STRING( 300 ),
        allowNull: true,
    },
} );

export default ConferenceI18n;
