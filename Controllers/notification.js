import Notification from '../models/notification.js'

export const notificationController={
    addNotification: async (req, res) => {
        const { idTransaction,description, dateSent, status} = req.query
        const date=new Date(dateSent)
        try {
            const notification = await Notification.create({TransactionId:idTransaction, description:description,status:status, date:date })
            res.status(200).json(notification)
        } 
        catch (error) {
            return res.status(400).json({status:400,error:error.message})
        }
    }
    ,
    getAllNotifications:async(req,res)=>{
        try{
            const notifications=await Notification.findAll()
            res.status(200).json(notifications)
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})
        }
    }
    ,
    deleteNotification:async(req,res)=>{
        const {notificationId}=req.params.id
        try{
            const notification=await Notification.findByPk(notificationId)
            if(notification){
                await notification.destroy()
                return res.status(200).json('notification deleted')
            }
            return res.status(404).json('notification not found')
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})

        }
    }
    ,
    editStatus:async(req,res)=>{
        const {notificationId,status}=req.params.id
        try{
            const notification=await Notification.findByPk(notificationId)
            if(notification){
               await notification.update({status:status})
               res.status(200).json(notification)
            }
            res.status(404).json('notification Not Found')
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})
        }
    }


}