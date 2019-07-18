import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';
import Schema from 'validate';

const AwardI18n = faculty.define( 'awardI18n', {
    awardId: {
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
    award: {
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
} );

/*
Const AwardI18nValidateSchema = new Schema({
    awardId:{

    }
    username: {
      type: String,
      required: true,
      length: { min: 3, max: 32 }
    },
    pets: [{
      name: {
        type: String
        required: true
      },
      animal: {
        type: String
        enum: ['cat', 'dog', 'cow']
      }
    }],
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      }
      zip: {
        type: String,
        match: /^[0-9]+$/,
        required: true
      }
    }
  })
  */

export default AwardI18n;
