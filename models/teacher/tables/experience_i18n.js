/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience_i18n', {
    experience_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'experience',
        key: 'experience_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    organization: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'experience_i18n',
    timestamps: false,
  });
};
