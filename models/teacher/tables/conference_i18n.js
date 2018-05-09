/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conference_i18n', {
    conference_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'conference',
        key: 'conference_id'
      }
    },
    language: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: 'en-US',
      primaryKey: true
    },
    conference: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    tableName: 'conference_i18n',
    timestamps: false,
  });
};
