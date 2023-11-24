import Transaction from "./models/transaction.js";
import Promotion from "./models/promotion.js";

export default function setupAssociations(){
    Promotion.hasMany(Transaction, { foreignKey: 'promotionId' })
    Transaction.belongsTo(Promotion, { foreignKey: 'promotionId' })  
}
