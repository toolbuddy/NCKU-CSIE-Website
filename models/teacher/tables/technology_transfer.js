/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('technology_transfer', {
    technology_transfer_id: {
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
    nsc_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'technology_transfer',
    timestamps: false,
  });
};
