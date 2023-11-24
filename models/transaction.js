import { Sequelize, DataTypes, ENUM } from "sequelize";
import sequelize from "../config/dbConfig.js";


const Transaction =sequelize.define('Transaction', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    // id_buyer :{
    //     type:DataTypes.INTEGER,
    //     allowNull:false,
    // },
    // id_seller:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // },
    amountUSD:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull:false,
    },
    Date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:ENUM(['deposit, withdraw, buy']),
        allowNull:false

    },
    amountUSDT:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    promotionId:{
      type:DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:"Promotions",
        key:`promotionId` 
      }
    }
})

// associatePromotion();
// Transaction.belongsTo(Promotion, { foreignKey: 'promotionId' })
// import Promotion from "./promotion.js";
// Transaction.hasOne(Promotion, { foreignKey: 'promotionId' })

await Transaction.sync();

export default Transaction;






// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Transaction extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Transaction.init({
//     id: DataTypes.INTEGER,
//     amountUSD: DataTypes.DECIMAL,
//     Date: DataTypes.DATE,
//     status: DataTypes.STRING,
//     type: DataTypes.STRING,
//     amountUSDT: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Transaction',
//   });
//   return Transaction;
// };
