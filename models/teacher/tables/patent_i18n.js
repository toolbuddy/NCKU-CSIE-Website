/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patent_i18n', {
    patent_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patent',
        key: 'patent_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'zh-TW',
      primaryKey: true
    },
    inventor: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    patent_owner: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    patent: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    tableName: 'patent_i18n',
    timestamps: false,
  });
};
