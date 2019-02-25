/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcementFileI18N', {
		fileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'announcement_file',
				key: 'file_id'
			},
			field: 'file_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			primaryKey: true,
			field: 'language'
		},
		name: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'name'
		},
		url: {
			type: DataTypes.STRING(2083),
			allowNull: false,
			field: 'url'
		}
	}, {
		tableName: 'announcement_file_i18n',
		timestamps: false
	});
};
