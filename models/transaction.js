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
    }
  }
  Transaction.init({
    // id: DataTypes.INTEGER,
    amountUSD: DataTypes.DECIMAL,
    Date: DataTypes.DATE,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    amountUSDT: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};