/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conference', {
    conference_id: {
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
    host_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'conference',
    timestamps: false,
  });
};
