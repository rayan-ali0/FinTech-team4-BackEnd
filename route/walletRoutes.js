import express from "express";
import {getAll,getWalletById,getWalletByUser,addWallet,editWallet,deleteWallet,updateBalance} from '../Controllers/Wallet.js'

export const walletRoutes=express.Router()

//getAll
walletRoutes.get('/read',getAll)

//get By Id
walletRoutes.get('/readById/:id',getWalletById)

//get By User
walletRoutes.get('/readByUser/:id',getWalletByUser)

//Create a wallet
walletRoutes.post('/add',addWallet)

//edit a wallet
walletRoutes.put('/edit',editWallet)

//delete a wallet
walletRoutes.delete('/delete/:id',deleteWallet)

//updateBalance
walletRoutes.put('/updateBalance',updateBalance)