module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
     userName: DataTypes.STRING,
     pwd: DataTypes.STRING,
     created_at: DataTypes.STRING
    });
    
    
    return User;
    }