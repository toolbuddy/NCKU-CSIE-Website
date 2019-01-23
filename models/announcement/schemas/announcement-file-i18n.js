import Sequelize from 'sequelize';
import { announcement, } from 'models/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const AnnouncementFileI18n = announcement.define( 'announcementFileI18n', {
    fileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    language: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: LanguageUtils.defaultLanguageId,
        primaryKey:   true,
    },
    name: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: false,
    },
    filepath: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: false,
    },
} );

export default AnnouncementFileI18n;
