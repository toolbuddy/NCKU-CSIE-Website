/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education', {
    education_id: {
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
    nation: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      defaultValue: 'TW'
    },
    degree: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    start_year: {
      type: "YEAR(4)",
      allowNull: false
    },
    end_year: {
      type: "YEAR(4)",
      allowNull: true
    }
  }, {
    tableName: 'education',
    timestamps: false,
  });
};
