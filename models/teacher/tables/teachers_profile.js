module.exports = function(sequelize, DataTypes) {
    return sequelize.define('teachers_profile', {
      profile_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
        },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      department: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      tel: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: '06-2757575 ext 62500'
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true
      },  
      email: {
        type: DataTypes.STRING(2083),
        allowNull: true
      },
      personal_web: {
        type: DataTypes.STRING(2083),
        allowNull: true
      },
      photo: {
        type: DataTypes.STRING(2083),
        allowNull: true
      }
    }, {
      tableName: 'teachers_profile',
      timestamps: false,
    });
  };
  