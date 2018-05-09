/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('title', {
    title_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'title_i18n',
        key: 'title_id'
      }
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'title',
    timestamps: false,
  });
};
