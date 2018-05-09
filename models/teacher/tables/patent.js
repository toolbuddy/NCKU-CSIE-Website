/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patent', {
    patent_id: {
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
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'TW'
    },
    nsc_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    certification_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    application_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expire_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'patent',
    timestamps: false,
  });
};
