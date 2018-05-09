/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publication', {
    publication_id: {
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
    issue_year: {
      type: "YEAR(4)",
      allowNull: true
    },
    category: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'publication',
    timestamps: false,
  });
};
