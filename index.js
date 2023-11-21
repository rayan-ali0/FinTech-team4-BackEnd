import sequelize from "./config/config.js";
import express from "express";
import "dotenv/config";
import cors from 'cors'

const app=express()

app.use(cors())
app.use(express.json())

sequelize.sync({force:false})
.then(()=>{
    console.log(`Databse synchronized successfully`)
})
.catch((error)=>{
console.log(`Error synchronizing database: ${error.message}`)
})
