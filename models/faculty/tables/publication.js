/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('publication', {
		publicationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
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
		issueMonth: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'issue_month'
		},
		category: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			field: 'category'
		},
		international: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'international'
		},
		refereed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'refereed'
		}
	}, {
		tableName: 'publication',
		timestamps: false
	});
};
