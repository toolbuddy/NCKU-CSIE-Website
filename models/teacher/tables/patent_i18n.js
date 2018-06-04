/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('patentI18N', {
		patentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'patent',
				key: 'patent_id'
			},
			field: 'patent_id'
		},
		language: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: 'zh-TW',
			primaryKey: true,
			field: 'language'
		},
		inventor: {
			type: DataTypes.STRING(300),
			allowNull: true,
			field: 'inventor'
		},
		patentOwner: {
			type: DataTypes.STRING(300),
			allowNull: true,
			field: 'patent_owner'
		},
		patent: {
			type: DataTypes.STRING(300),
			allowNull: false,
			field: 'patent'
		}
	}, {
		tableName: 'patent_i18n',
		timestamps: false
	});
};
