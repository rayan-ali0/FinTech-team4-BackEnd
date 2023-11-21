import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

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
});

// Promotion.belongsTo(User, { foreignKey: 'userId' })

export default Promotion 