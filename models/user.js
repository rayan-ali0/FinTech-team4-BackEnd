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
      User.hasOne(models.WalletModel,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      })
      User.hasMany(models.PromotionModel,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
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