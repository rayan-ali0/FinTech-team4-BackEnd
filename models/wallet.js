'use strict';
import {Model} from "sequelize"
export default (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.UserModel)
    }
  }
  Wallet.init({
    usdBalance: DataTypes.DECIMAL,
    usdtBalance: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};