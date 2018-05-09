/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('honor_i18n', {
    honor_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'honor',
        key: 'honor_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    honor: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    tableName: 'honor_i18n',
    timestamps: false,
  });
};
