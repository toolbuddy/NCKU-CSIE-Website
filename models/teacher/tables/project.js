/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project', {
    project_id: {
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
    start_year: {
      type: "YEAR(4)",
      allowNull: false
    },
    end_year: {
      type: "YEAR(4)",
      allowNull: true
    },
    category: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'project',
    timestamps: false,
  });
};
