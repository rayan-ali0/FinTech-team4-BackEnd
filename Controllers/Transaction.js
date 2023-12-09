// Import necessary modules and models
// import Transaction from '../models/transaction.js';
// import Promotion from '../models/Promotion.js';
// import { io } from '../socketServer.js'; 
import { where ,Op} from 'sequelize';
import db from '../models/index.js'
import bodyParser from 'body-parser';
import transaction from '../models/transaction.js';
const {TransactionModel,UserModel, WalletModel, NotificationModel,PromotionModel}=db
// Get all transactions with pagination
export const getTransactions = async (req, res) => {
   
   // const { page , pageSize = 10 } = req.query;
   // const offset = (page - 1) * pageSize;

   try {
      // const transactions = await TransactionModel.findAll({
      //    offset,
      //    limit: pageSize,
      // });
      const transactions = await TransactionModel.findAll();
     return res.status(200).json(transactions);
   } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

export const getTransactionByIdUser =async(req,res)=>{
//   const { page =1, pageSize=10,userId}= req.query;
//   const offset =(page -1)* pageSize;
const {userId}=req.query
  try {
   const UserTransactions= await TransactionModel.findAll({where :{[Op.or]: [
      {BuyerId:userId},
      {SellerId:userId}
   ]},
      // offset,
      // limit:pageSize
   })
   res.status(200).json(UserTransactions)
  } catch (error) {
   res.status(500).json({error:error.message})
  }
}


export const getLastTransactions= async(req, res)=>{
   const {userId}= req.query;
   try {
      const lastTransactions= await TransactionModel.findAll({where :{
         [Op.or]: [
            { SellerId: userId },
            { BuyerId: userId },
         ],
      }, order:[['createdAt', 'DESC']],
      limit:4,
      include:[UserModel]
   })
   res.status(200).json(lastTransactions)
   } catch (error) {
      res.status(500).json({error:error.message})
   }
}

export const getPendingLastTransactions= async(req, res)=>{
   const {userId}= req.query;
   try {
      const lastTransactions= await TransactionModel.findAll({where :{
         [Op.and]: [
            { SellerId: userId },
            { status: "pending" },
            {type:"transaction"}
         ],
      }, order:[['createdAt', 'DESC']],
      limit:4,
      include:[{model:PromotionModel}]
   })
   res.status(200).json(lastTransactions)
   } catch (error) {
      res.status(500).json({error:error.message})
   }
}
// Create a new transaction and emit a Socket.IO event
export const createTransaction = async (req, res) => {
    const {amountUSD, type, amountUSDT,buyerId, sellerId,promotionId}= req.body
   //  const date= new Date(Datee)
    const usdAmount=Number(amountUSD)
    const usdtAmount=Number(amountUSDT)
    var transactionAmount;
    var status;
   try {
      if(type==="deposit"){
         const UserWallet= await WalletModel.findOne({
            where:{
               UserId:buyerId
            }
         })
         const old=Number(UserWallet.usdBalance)
          UserWallet.usdBalance=old+usdAmount;
          status="accepted"
         await UserWallet.save()

      }else
      if(type==="transfer"){
         const senderWallet=await WalletModel.findOne({
            where:{
               UserId:sellerId
            }
         })
         const recieverWallet=await WalletModel.findOne({
            where:{
               UserId:buyerId
            }
         })
         
         
         const oldSender=Number(senderWallet.usdtBalance)
         const oldReceiver=Number(recieverWallet.usdtBalance)

         if(oldSender <usdtAmount){
            status="rejected"

            return res.json({success:false, message:'Insuficient funds'})
         }else{
            status="accepted"
         senderWallet.usdtBalance=oldSender-usdtAmount
         await senderWallet.save()
         recieverWallet.usdtBalance= oldReceiver+usdtAmount
         await recieverWallet.save()
      }
      }

      else if(type==="transaction"){
         const senderWallet=await WalletModel.findOne({//merchant who is selling usdt
            where:{
               UserId:sellerId
            }
         })
         const recieverWallet=await WalletModel.findOne({// user who is buying usdt
            where:{
               UserId:buyerId
            }
         })
        
         const oldSender=Number(senderWallet.usdtBalance)
         const oldReceiver=Number(recieverWallet.usdBalance)

         if(oldSender >=usdtAmount && oldReceiver>usdAmount){
            recieverWallet.usdBalance=oldReceiver-usdAmount
            status="pending"
            await recieverWallet.save()

         }
         else if(oldReceiver<usdAmount){
            return res.json({message:"Don't have this amount"})

         }
         else {
            console.log(usdtAmount)
            console.log(usdAmount)
            return res.json({message:"Insuficient funds"})
         }
         

      }
      const date=new Date()

      const newTransaction = await TransactionModel.create({
        amountUSD:usdAmount, status:status, type:type, amountUSDT:usdtAmount, SellerId:sellerId, BuyerId:buyerId,promotionId
      });
      const notification=await NotificationModel.create({description:'A user is asking for  a transaction',date:date,status:'unseen',TransactionId:newTransaction.id})


     
      // Emit a 'newTransaction' event to connected clients
    //   io.emit('newTransaction', newTransaction);
      res.json(newTransaction);
      console.log(newTransaction)
   } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
   }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
   const { transactionId , action} = req.query;



   try {
      const transaction =await TransactionModel.findByPk(transactionId)
      if(action==="rejected"){
        await transaction.update({
            status:"declined"
         })
         // console.log(transaction.BuyerId)
         const UserWallet=await WalletModel.findOne({where:{UserId:transaction.BuyerId}})
         if(UserWallet){
            const newBalance=Number(UserWallet.usdBalance)+Number(transaction.amountUSD)
            await UserWallet.update({usdBalance:newBalance})
            await UserWallet.save()

            // console.log(UserWallet)
            console.log(newBalance)
         }
         else{
          return  res.json('wallet not found')
         }

      }
      else if(action==="accepted"){
         await transaction.update({
            status:"accepted"
         })
         const MerchantWallet =await WalletModel.findOne({where:{UserId:transaction.SellerId}})
         const UserWallet=await WalletModel.findOne({where:{UserId:transaction.BuyerId}})
         const merchantNewUsd=Number(MerchantWallet.usdBalance)+Number(transaction.amountUSD)
         const merchantNewUsdt=Number(MerchantWallet.usdtBalance)-Number(transaction.amountUSDT)

         await MerchantWallet.update({usdBalance:merchantNewUsd,usdtBalance:merchantNewUsdt })
         const usernewUSDT=Number(UserWallet.usdtBalance)+Number(transaction.amountUSDT)
         await UserWallet.update({usdtBalance:usernewUSDT})
         await UserWallet.save()
         await MerchantWallet.save()


      }
     return  res.status(200).json("Done")
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedRows = await TransactionModel.destroy({
         where: { id :id},
      });
      if (deletedRows > 0) {
         res.json({ message: 'Transaction deleted successfully' });
      } else {
         res.status(404).json({ error: 'Transaction not found' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Internal sServer Error' });
   }
};


export const getUserIncome=async (req,res)=>{
   const {id}=req.query
   var role;
   try{
const user=await UserModel.findOne({where:{id:id}})
if(user){
role=user.role
if(role==="user"){
   const transactions=await TransactionModel.findAll(
      {
         where:{
            BuyerId:id,
            type:['deposit','transfer']
         }
      }
   )
   let depositIncome=0
   let transferIncome=0
   transactions.forEach((transaction)=>{
      if(transaction.type==="deposit"){
         depositIncome+=transaction.amountUSD
      }
      else if(transaction.type==="transfer"){
         transferIncome+=transaction.amountUSDT
      }
   })
   res.status(200).json({transferIncome,depositIncome})

}
else if(role==="merchant"){
   const transactions=await TransactionModel.findAll(
      {
         where:{
         [Op.or]:[
         {type:'transaction',SellerId:id,status:"accepted"},
         {type:'deposit',BuyerId:id}
         ]
         }
      }
   )
   let depositIncome=0
   let transactionIncome=0
   transactions.forEach((transaction)=>{
      if(transaction.type==="deposit"){
         depositIncome+=transaction.amountUSD
      }
      else if(transaction.type==="transaction"){
         transactionIncome+=transaction.amountUSD
      }
   })
   res.status(200).json({transactionIncome,depositIncome})

}
res.status(200).json({transferIncome,depositIncome})
}
else{
   res.json('User not found')   
}
}
   catch(error){
      res.status(500).json({ error: 'Internal Server Error' });

   }
}

export const getUserOutcome=async (req,res)=>{
   const {id}=req.query
   var role;
   try{
const user=await UserModel.findOne({where:{id:id}})
if(user){
role=user.role
if(role==="user"){
   const transactions=await TransactionModel.findAll(
      {
         where:{
            [Op.or]:[
            {type:'transaction',BuyerId:id,status:"accepted"},
            {type:'transfer',SellerId:id}
            ]
            }
      }
   )
   let transactionOut=0
   let transferOut=0
   transactions.forEach((transaction)=>{
      if(transaction.type==="transaction"){
         transactionOut+=Number(transaction.amountUSD)
      }
      else if(transaction.type==="transfer"){
         transferOut+=Number(transaction.amountUSDT)
      }
   })
   res.status(200).json({transactionOut,transferOut})

}
else if(role==="merchant"){
   const transactions=await TransactionModel.findAll(
      {
         where:{
         [Op.or]:[
         {type:'transaction',SellerId:id,status:"accepted"},
         {type:'transfer',SellerId:id}
         ]
         }
      }
   )
   let transactionOut=0
   let transferOut=0
   transactions.forEach((transaction)=>{
      if(transaction.type==="transfer"){
         transferOut+=Number(transaction.amountUSDT)
      }
      else if(transaction.type==="transaction"){
         transactionOut+=Number(transaction.amountUSDT)
      }
   })
   res.status(200).json({transactionIncome,depositIncome})

}
res.status(200).json({transferIncome,depositIncome})
}
else{
   res.json('User not found')   
}
}
   catch(error){
      res.status(500).json({ error: 'Internal Server Error' });

   }
}