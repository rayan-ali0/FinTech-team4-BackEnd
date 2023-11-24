'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.TransactionModel)
      // define association here
    }
  }
  Notification.init({
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.ENUM(["seen", "unseen"])
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};