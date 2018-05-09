/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('honor', {
    honor_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profile_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'profile',
        key: 'profile_id'
      }
    },
    honor_year: {
      type: "YEAR(4)",
      allowNull: false
    }
  }, {
    tableName: 'honor',
    timestamps: false,
  });
};
