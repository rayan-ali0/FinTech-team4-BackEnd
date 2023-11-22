import Wallet from "../Models/Wallet.js";

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
    const walletId=req.params
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
    const userId=req.params
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
    const {userId,usdBalance,usdtBalance}=req.query
    try{
        const wallet=await Wallet.create({userId,usdBalance,usdtBalance});
        return res.status(200).json(wallet)
    }
    catch(error){
        return res.status(500).json('cannot create wallet'+ error.message)
    }
}