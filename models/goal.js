module.exports = function(sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
     goal: DataTypes.STRING,
     endDate: DataTypes.DATETIME,
     ms1: DataType.STRING,
     ms2: DataType.STRING,
     ms3: DataType.STRING,
     ms4: DataType.STRING,
     ms5: DataType.STRING,
      
    });
  
  Goal.associate = function(models) {
      // We're saying that a Post should belong to an user
      // A Post can't be created without an user due to the foreign key constraint
    Goal.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Goal;

  };
  
