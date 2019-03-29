import Sequelize from 'sequelize';
import { announcement, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const FileI18n = announcement.define( 'fileI18n', {
    fileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    languageId: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: LanguageUtils.defaultLanguageId,
        primaryKey:   true,
    },
    name: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: false,
    },
    filePath: {
        type:      Sequelize.STRING( 2083 ),
        allowNull: false,
    },
} );

export default FileI18n;
