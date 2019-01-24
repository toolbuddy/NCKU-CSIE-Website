/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('title', {
		titleId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
			field: 'title_id'
		},
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'profile',
				key: 'profile_id'
			},
			field: 'profile_id'
		},
		from: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'from'
		},
		to: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'to'
		}
	}, {
		tableName: 'title',
		timestamps: false
	});
};
