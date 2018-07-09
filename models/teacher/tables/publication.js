/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('publication', {
		publicationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'publication_id'
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
		issueYear: {
			type: "YEAR(4)",
			allowNull: true,
			field: 'issue_year'
		},
		category: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			field: 'category'
		}
	}, {
		tableName: 'publication',
		timestamps: false
	});
};
