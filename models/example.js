module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("User", {
  // var User = sequelize.define("User", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  return Example;
  // return User;
};


//CHANGE THE NAME OF THE FILE TO USER.JS