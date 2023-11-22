// User Model

import { ENUM, INTEGER, STRING } from "sequelize";
import sequelize from "../config/dbConfig.js";

const User = sequelize.define('User', {

    idUser : {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_user',
    },
    userName :{
        type: STRING({length:256}),
        field: 'user_name',
        unique: true,
        allowNull: false
    },
    name : {
        type: STRING({length:256}),
        unique: true,
        allowNull: false
    },
    email : {
        type: STRING({length:256}),
        unique: true,
        allowNull: false
    },
    password : {
        type: STRING,
        allowNull: false,
    },
    role : {
        type: ENUM(['admin', 'user','merchant']),
        defaultValue: 'user',
        allowNull:false,

    },
    avatar : {
        type: STRING,
        defaultValue: "",
    }
}, {sequelize, createdAt: 'created_at', updatedAt: 'updated_at'} )

export default User;