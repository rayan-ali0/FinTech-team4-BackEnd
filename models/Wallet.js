// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Wallet extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Wallet.init({
//     usdBalance: DataTypes.DOUBLE,
//     usdtBalance: DataTypes.DOUBLE
//   }, {
//     sequelize,
//     modelName: 'Wallet',
//   });
//   return Wallet;
// };
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import User from './User.js'

const Wallet = sequelize.define('Wallet', {
    walletId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field:"wallet_id"
    },
    usdBalance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        field:'usd_balance'
    },
    usdtBalance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        field:'usdt_balance'
    }
    // userId:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false,
    //   unique:true,
    //   references:{
    //     model:User,
    //     key:`idUser`
    //   }
    // }
},{
    timestamps:true,
    tableName:'wallets'
});

// Wallet.belongsTo(User, { foreignKey: 'userId' })

export default Wallet