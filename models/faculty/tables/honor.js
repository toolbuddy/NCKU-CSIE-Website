/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('honor', {
		honorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'honor_id'
		},
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'profile',
				key: 'profile_id'
			},
			field: 'profile_id'
		},
		honorYear: {
			type: "YEAR(4)",
			allowNull: false,
			field: 'honor_year'
		}
	}, {
		tableName: 'honor',
		timestamps: false
	});
};
