// import sequelize from "./config/dbConfig.js";
// import sequelize from "./config/config.js";
// import userRouter from './Routes/UserRoutes.js'
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import db from './models/index.js';
import transactionRouter from "./Routes/transaction.js";
// import Wallet from "./models/Wallet.js";
// import Promotion from "./models/promotion.js";
// import Transaction from "./models/transaction.js";
// import setupAssociations from './associations.js'

dotenv.config();

const app=express();
app.use(cors())
app.use(express.json())
app.use("/",transactionRouter)

try{
    app.listen(process.env.DB_PORT, () => { 
        console.log(`Server is running on port ${process.env.DB_PORT}`)
        })

        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await db.sequelize.sync({alter: true});
        console.log('Database synced!');
    } catch(error) { 
        console.error(error)
    }
