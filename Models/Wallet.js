import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Wallet = sequelize.define('Wallet', {
    walletId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field:"wallet_id"
    },
    usdBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field:'usd_balance'
    },
    usdtBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        field:'usdt_balance'
    }
},{
    timestamps:true,
    tableName:'wallets'
});

// Wallet.belongsTo(User, { foreignKey: 'userId' })

export default Wallet