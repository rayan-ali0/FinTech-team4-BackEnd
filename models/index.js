import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
// import Book from './book.js';
// import Category from './category.js';
// import Author from './author.js'
import User from './user.js'
import Wallet from "./wallet.js";
import Promotion from "./promotion.js";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// const BookModel = Book(sequelize, Sequelize);
// const CategoryModel = Category(sequelize, Sequelize);
// const AuthorModel = Author(sequelize, Sequelize);

const UserModel = User(sequelize, Sequelize);  
const WalletModel=Wallet(sequelize,Sequelize)
const PromotionModel=Promotion(sequelize,Sequelize)

// const db = {
//   sequelize,
//   Sequelize,
//   BookModel,
//   CategoryModel,
//   AuthorModel,
  
// };

const db = {
  sequelize,
  Sequelize,
  UserModel,
  WalletModel,
  PromotionModel
};

let iter = 0;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    // console.log("");
    // console.log(iter++);
  }

});
export default db;

  