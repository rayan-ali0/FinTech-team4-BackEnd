'use strict';
// import {Model} from "sequelize"
// const {
//   Model
// } = require('sequelize');
import {Model} from 'sequelize'
export default  (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Transaction.hasOne(models.NotificationModel,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
      // define association here
      Transaction.belongsTo(models.UserModel)
      Transaction.belongsTo(models.PromotionModel,{
        
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        
      })
    }
  }
  Transaction.init({
    // id: DataTypes.INTEGER,
    amountUSD: DataTypes.DECIMAL(10,2),
    Date: DataTypes.DATE,
    status: DataTypes.ENUM(['accepted','declined','pending']),
    type: DataTypes.ENUM(['deposit','transfer','transaction']),
    amountUSDT: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};