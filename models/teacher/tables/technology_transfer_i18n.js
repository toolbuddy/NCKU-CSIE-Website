/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('technology_transfer_i18n', {
    technology_transfer_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'technology_transfer',
        key: 'technology_transfer_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    patent: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    technology: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    authority: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    receiver: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'technology_transfer_i18n',
    timestamps: false,
  });
};
