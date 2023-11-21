import { Sequelize, DataTypes, ENUM } from "sequelize";
import sequelize from "../config/config";


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
    // promotion_id:{
    //     type:DataTypes.INTEGER,
        
        
    // }
})

sequelize.sync().then(() => {



    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });



export default Transaction;
