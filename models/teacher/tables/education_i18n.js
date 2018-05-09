/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education_i18n', {
    education_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'education',
        key: 'education_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    school: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    major: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'education_i18n',
    timestamps: false,
  });
};
