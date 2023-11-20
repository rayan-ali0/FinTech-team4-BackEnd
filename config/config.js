import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()



const sequelize=new Sequelize(

process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
    host:process.env.DB_HOST,
    // port: process.env.DB_PORT,
    dialect:'mysql',
    }

)

const testConnection=async()=>{
    try{
        await sequelize.authenticate()
        console.log("connection Done")
    }
    catch(error){
        console.log("eroorrrr"+error.message)
    }
}

testConnection()

export default sequelize

