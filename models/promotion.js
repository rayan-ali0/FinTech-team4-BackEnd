'use strict';

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.belongsTo(models.UserModel)
    }
  }
  Promotion.init({
    description: DataTypes.STRING,
    expDate: DataTypes.DATE,
    percentage: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};