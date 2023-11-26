import Wallet from "../models/Wallet.js";

export const getAll=async(req,res)=>{
    try{
        const wallets=await Wallet.findAll();
        return res.status(200).json(wallets)
    }
    catch(error){
        return res.status(500).json('cannot get all wallets'+ error.message)
    }
}

export const getWalletById=async(req,res)=>{
    const walletId=req.params.id
    try{
        const wallet=await Wallet.findByPk(walletId);
        if(wallet){
            return res.status(200).json(wallet)
        }
        else{
            return res.status(400).json("Wallet")
        }
    }
    catch(error){
        return res.status(500).json('cannot get wallet'+ error.message)
    }
}

export const getWalletByUser=async(req,res)=>{
    const userId=req.params.id
    try{
        const wallet=await Wallet.findByPk(userId);
        if(wallet){
            return res.status(200).json(wallet)
        }
        else{
            return res.status(r00).json("Wallet not found")

        }
    }
    catch(error){
        return res.status(500).json('cannot get wallet'+ error.message)
    }
}

export const addWallet=async(req,res)=>{
    const {userId,usdBalance,usdtBalance}=req.query
    try{
        const wallet=await Wallet.create({userId,usdBalance,usdtBalance});
        return res.status(200).json(wallet)
    }
    catch(error){
        return res.status(500).json('cannot create wallet'+ error.message)
    }
}

export const editWallet=async(req,res)=>{
    const {walletId,userId,usdBalance,usdtBalance}=req.query
    try{
        const wallet=await Wallet.findByPk(walletId);
        if(wallet){
         const updatedWallet= await wallet.update({userId:userId,usdBalance:usdBalance,usdtBalance:usdtBalance})
         return res.status(200).json(updatedWallet)
        }
        else{
            res.status(404).json('Wallet not Found')
        }
    }
    catch(error){
        return res.status(500).json('cannot edit wallet'+ error.message)
    }
}

export const deleteWallet=async(req,res)=>{
    const {walletId}=req.params.id
    try{
        const deleteWallet=await Wallet.destroy({
            where:{
                walletId:walletId
            }
        });
        return res.status(200).json('Wallet deleted')
    }
    catch(error){
        return res.status(500).json('cannot edit wallet'+ error.message)
    }
}

export const updateBalance=async(req,res)=>{
    const {userId,amount,currency,operation}=req.query
    let amountNb=Number(amount)
    try{
        const wallet=await Wallet.findOne({where:{userId:userId}});
        if(wallet){
              if(operation==='add'){
                if(currency==='usd'){
                    wallet.usdBalance+=amountNb
                }
                else if(currency==='usdt'){
                    wallet.usdtBalance+=amountNb
                }
                else{
                    return res.status(404).json('cannot Find Currency'+ error.message)
                }
              }
              else if(operation==='remove'){
                if(currency==='usd'){
                    if(wallet.usdBalance>=amountNb){
                        wallet.usdBalance-=amountNb
                    }
                    else{
                        return {success:false,message:'Insuficient Funds'}
                    }
                }
                else if(currency==='usdt'){
                    if(wallet.usdtBalance>=amountNb){
                        wallet.usdtBalance-=amountNb
                    }               
                 }
                 else{
                    return {success:false,message:'Insuficient Funds'}
                }
              }
        }else{
            return res.status(400).json('cannot Find wallet'+ error.message)

        }
        await wallet.save();
        return res.status(200).json(wallet)
    }
    catch(error){
        return res.status(500).json('cannot update wallet'+ error.message)
    }
}
