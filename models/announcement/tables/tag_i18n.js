/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tagI18N', {
		tagId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tag',
				key: 'tag_id'
			},
			field: 'tag_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'tag_i18n',
		timestamps: false
	});
};
