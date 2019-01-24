/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tag', {
		tagId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'tag_id'
		}
	}, {
		tableName: 'tag',
		timestamps: false
	});
};
