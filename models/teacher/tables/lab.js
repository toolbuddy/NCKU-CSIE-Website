/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lab', {
    lab_id: {
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
    tel: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: '06-2757575 ext 62500'
    },
    lab_web: {
      type: DataTypes.STRING(2083),
      allowNull: true
    }
  }, {
    tableName: 'lab',
    timestamps: false,
  });
};
