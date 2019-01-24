/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement', {
		announcementId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'announcement_id'
		},
		publishTime: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'publish_time'
		},
		updateTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp'),
			field: 'update_time'
		},
		author: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'author'
		},
		views: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'views'
		},
		isPinned: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_pinned'
		},
		isPublished: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1',
			field: 'is_published'
		},
		isApproved: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1',
			field: 'is_approved'
		}
	}, {
		tableName: 'announcement',
		timestamps: false
	});
};
