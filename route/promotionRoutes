import express from "express";
import { promotionController } from "../Controllers/Promotion";

export const promotionRoutes=express.Router()

//Create a wallet
promotionRoutes.post('/add',promotionController.addPromotion)

//getAll
promotionRoutes.get('/read',promotionController.getAllPromotions)

//get By Code
promotionRoutes.get('/readByCode',promotionController.getPromotionbyCode)

//delete a promotion
promotionRoutes.delete('/delete/:id',promotionController.deletePromotion)

//edit a promotion
promotionRoutes.put('/edit',promotionController.editPromotion)

//get promotions for a user
promotionRoutes.get('/readByUser/:od',promotionController.getPromotionsForUser)

