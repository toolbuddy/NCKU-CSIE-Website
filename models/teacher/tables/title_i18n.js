/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('title_i18n', {
    title_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'title_i18n',
    timestamps: false,
  });
};
