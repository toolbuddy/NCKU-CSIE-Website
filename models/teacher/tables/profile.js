/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('profile', {
    profile_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fax: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '2747076'
    },
    email: {
      type: DataTypes.STRING(2083),
      allowNull: true
    },
    personal_web: {
      type: DataTypes.STRING(2083),
      allowNull: true
    },
    nation: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: 'TW'
    },
    photo: {
      type: DataTypes.STRING(2083),
      allowNull: true
    }
  }, {
    tableName: 'profile',
    timestamps: false,
  });
};
