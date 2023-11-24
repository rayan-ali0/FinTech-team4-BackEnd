'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TransactionModel,{
        foreignKey:'BuyerId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
      User.hasMany(models.TransactionModel,{
        foreignKey:'SellerId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(['admin', 'user','merchant']),
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};