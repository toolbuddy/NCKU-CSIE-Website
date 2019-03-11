/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('profile', {
		profileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'profile_id'
		},
		fax: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: '2747076',
			field: 'fax'
		},
		email: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'email'
		},
		personalWeb: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'personal_web'
		},
		nation: {
			type: DataTypes.CHAR(2),
			allowNull: false,
			defaultValue: 'TW',
			field: 'nation'
		},
		photo: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'photo'
		},
		officeTel: {
			type: DataTypes.STRING(30),
			allowNull: false,
			defaultValue: '06-2757575,62500',
			field: 'office_tel'
		},
		labTel: {
			type: DataTypes.STRING(30),
			allowNull: false,
			defaultValue: '06-2757575,62500',
			field: 'lab_tel'
		},
		labWeb: {
			type: DataTypes.STRING(2083),
			allowNull: true,
			field: 'lab_web'
		}
	}, {
		tableName: 'profile',
		timestamps: false
	});
};
