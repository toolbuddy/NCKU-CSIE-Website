/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department', {
    department_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'department_i18n',
        key: 'department_id'
      }
    },
    profile_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profile',
        key: 'profile_id'
      }
    }
  }, {
    tableName: 'department',
    timestamps: false,
  });
};
