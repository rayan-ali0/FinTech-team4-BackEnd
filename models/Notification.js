// User Model

import { DATE, ENUM, INTEGER, STRING } from "sequelize";
import sequelize from "../config/config.js";

const Notification = sequelize.define('Notification', {

    idNotification : {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_notification',
    },
    description : {
        type: STRING({length: 256}),
        allowNull: false,
    },
    date : {
        type: DATE,
        allowNull: false,
    },
    status : {
        type: Boolean,
        allowNull: false,
    }

}, {sequelize, createdAt: 'created_at', updatedAt: 'updated_at'} )

export default Notification;