/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specialty', {
    specialty_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profile_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profile',
        key: 'profile_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    specialty: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'specialty',
    timestamps: false,
  });
};
