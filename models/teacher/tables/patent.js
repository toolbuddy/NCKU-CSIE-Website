/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('patent', {
		patentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'patent_id'
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
		nation: {
			type: DataTypes.STRING(30),
			allowNull: false,
			defaultValue: 'TW',
			field: 'nation'
		},
		nscNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'nsc_number'
		},
		certificationNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'certification_number'
		},
		applicationDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'application_date'
		},
		issueDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'issue_date'
		},
		expireDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'expire_date'
		}
	}, {
		tableName: 'patent',
		timestamps: false
	});
};
