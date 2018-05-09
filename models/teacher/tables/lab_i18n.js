/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lab_i18n', {
    lab_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'lab_i18n',
    timestamps: false,
  });
};
