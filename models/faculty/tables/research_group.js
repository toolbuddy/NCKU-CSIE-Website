/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('researchGroup', {
		researchGroupId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'research_group_id'
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
		type: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'type'
		}
	}, {
		tableName: 'research_group',
		timestamps: false
	});
};
