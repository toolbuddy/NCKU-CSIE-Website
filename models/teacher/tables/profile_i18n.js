/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('profile_i18n', {
    profile_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profile',
        key: 'profile_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'profile_i18n',
    timestamps: false,
  });
};
