/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('publicationI18N', {
		publicationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'publication',
				key: 'publication_id'
			},
			field: 'publication_id'
		},
		language: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		publication: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'publication'
		},
		title: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'title'
		},
		authors: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'authors'
		}
	}, {
		tableName: 'publication_i18n',
		timestamps: false
	});
};
