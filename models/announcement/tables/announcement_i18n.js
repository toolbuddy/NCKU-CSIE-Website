/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcementI18N', {
		announcementId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'announcement',
				key: 'announcement_id'
			},
			field: 'announcement_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		title: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'title'
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'content'
		}
	}, {
		tableName: 'announcement_i18n',
		timestamps: false
	});
};
