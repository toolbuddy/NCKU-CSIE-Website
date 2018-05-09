/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department_i18n', {
    department_id: {
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
    department: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'department_i18n',
    timestamps: false,
  });
};
