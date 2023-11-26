import Promotion from '../models/promotion.js'

export const promotionController = {

    addPromotion: async (req, res) => {
        const { description, expDate, percentage, code } = req.query
        const perc=Number(percentage)
        const date=new Date(expDate)
        try {
            const promotion = await Promotion.create({ description, expDate:date, percentage:perc, code })
            res.status(200).json(promotion)
        } 
        catch (error) {
            return res.status(400).json({status:400,error:error.message})
        }
    }
    ,
    getAllPromotions:async(req,res)=>{
        try{
            const promotions=await Promotion.findAll()
            res.status(200).json(promotions)
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})
        }
    }
    ,
    getPromotionsForUser:async(req,res)=>{
        const {merchantId}=req.query.id
        try{
            const promotions=await Promotion.findAll({
                where:{
                    userId:merchantId
                }
            })
            res.status(200).json(promotions)
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})
        }  
    }
    ,
    getPromotionbyCode:async(req,res)=>{
        const {code,merchantId}=req.query
        try{
            const promotion=await Promotion.findOne({
                where:{
                    code:code,
                    merchantId:merchantId
                }
            })
            if(promotion){
                return  res.status(200).json(promotion)

            }
            else{
                return res.status(404).json('Promotion not Found')
            }
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})
        }

    }
    ,
    deletePromotion:async(req,res)=>{
        const {promotionId}=req.params.id
        try{
            const promotion=await Promotion.findByPk(promotionId)
            if(promotion){
                await promotion.destroy()
                return res.status(200).json('promotion deleted')
            }
            return res.status(404).json('promotion not found')
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})

        }
    }
    ,
    editPromotion:async(req,res)=>{
        const {promotionId,description,expDate,percentage,code}=req.query
        const perc=Number(percentage)
        const date=new Date(expDate)
        try{
            const promotion=await Promotion.findByPk(promotionId)
            if(promotion){
               await promotion.update({description,expDate:date,percentage:perc,code})
               res.status(200).json(promotion)
            }
            res.status(404).json('Promotion Not Found')
        }
        catch(error){
            return res.status(400).json({status:400,error:error.message})
        }

     
    }
    



}