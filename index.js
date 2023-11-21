import sequelize from "./config/dbConfig.js";
// import sequelize from "./config/config.js";
import userRouter from './Routes/UserRoutes.js'
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app=express();

try{
    app.listen(process.env.PORT, () => { 
        console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch { 
        console.error('Error starting server')
    }

app.use('/user', userRouter);