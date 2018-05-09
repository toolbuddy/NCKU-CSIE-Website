/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publication_i18n', {
    publication_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'publication',
        key: 'publication_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'en-US',
      primaryKey: true
    },
    publication: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    tableName: 'publication_i18n',
    timestamps: false,
  });
};
