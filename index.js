import sequelize from "./config/dbConfig.js";
// import sequelize from "./config/config.js";
import userRouter from './Routes/UserRoutes.js'
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app=express();
app.use(cors())
app.use(express.json())
try{
    app.listen(process.env.PORT, () => { 
        console.log(`Server is running on port ${process.env.DB_PORT}`)
        })
    } catch { 
        console.error('Error starting server')
    }


sequelize.sync({force:false,alter:true})
.then(()=>{
    console.log(`Databse synchronized successfully`)
})
.catch((error)=>{
console.log(`Error synchronizing database: ${error.message}`)
})

app.use('/user', userRouter);

