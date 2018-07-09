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
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'en-US',
			primaryKey: true,
			field: 'language'
		},
		publication: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'publication'
		}
	}, {
		tableName: 'publication_i18n',
		timestamps: false
	});
};
