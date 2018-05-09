/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('office_i18n', {
    office_id: {
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
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'office_i18n',
    timestamps: false,
  });
};
