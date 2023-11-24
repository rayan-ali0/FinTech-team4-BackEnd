import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Promotion = sequelize.define('Promotion', {
    promotionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field:'promotion_id'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expDate:{
        type:DataTypes.DATE,
        allowNull:false,
        field:'exp_date'
    },
    percentage:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    code:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{ tableName: 'Promotions' });
// import Transaction from './transaction.js'

// // Promotion.hasMany(Transaction, { foreignKey: 'promotionId' })
// Promotion.belongsTo(Transaction, { foreignKey: 'promotionId' })

await Promotion.sync();
export default Promotion 



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Promotion extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Promotion.init({
//     description: DataTypes.STRING,
//     expDate: DataTypes.DATE,
//     code: DataTypes.STRING,
//     percentage: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Promotion',
//   });
//   return Promotion;
// };