import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import db from './models/index.js';
import transactionRouter from "./Routes/transaction.js";
import userRouter from './Routes/user.route.js'
import authRouter from './Routes/auth.route.js'
import {promotionRoutes} from './Routes/promotionRoutes.js'
import {walletRoutes} from './Routes/walletRoutes.js'
import bodyParser from "body-parser";
dotenv.config();

const app=express();
app.use(cors())
app.use(express.json())
app.use("/",transactionRouter)
    app.use(express.urlencoded({ extended: true }));

try{
    app.listen(process.env.DB_PORT, () => { 
        console.log(`Server is running on port ${process.env.DB_PORT}`)
        })

        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync({alter: true});
        console.log('Database synced!');
    } catch(error) { 
        console.error(error)
    }

app.use('/promotion',promotionRoutes)    
app.use('/wallet',walletRoutes)    
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use("/",transactionRouter)
