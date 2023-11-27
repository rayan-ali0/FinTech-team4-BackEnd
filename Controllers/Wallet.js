import db from '../models/index.js';
const { WalletModel, UserModel } = db;

export const getAll = async (req, res) => {
    try {
        const wallets = await WalletModel.findAll({
            include: [UserModel]
        });
        return res.status(200).json(wallets)
    }
    catch (error) {
        return res.status(500).json('cannot get all wallets' + error.message)
    }
}

export const getWalletById = async (req, res) => {
    const walletId = req.params.id
    try {
        const wallet = await WalletModel.findByPk(walletId, {
            include: [UserModel]
        });
        if (wallet) {
            return res.status(200).json(wallet)
        }
        else {
            return res.status(400).json("Wallet")
        }
    }
    catch (error) {
        return res.status(500).json('cannot get wallet' + error.message)
    }
}

export const getWalletByUser = async (req, res) => {
    const userId = req.params.id
    try {
        const wallet = await WalletModel.findOne({
            where: {
                UserId: userId
            },
            include: [UserModel]
        });
        if (wallet) {
            return res.status(200).json(wallet)
        }
        else {
            return res.status(r00).json("Wallet not found")

        }
    }
    catch (error) {
        return res.status(500).json('cannot get wallet' + error.message)
    }
}

export const addWallet = async (req, res) => {
    const { userId, usdBalance, usdtBalance } = req.query
    try {
        const wallet = await WalletModel.create({ UserId: userId, usdBalance, usdtBalance });
        return res.status(200).json(wallet)
    }
    catch (error) {
        return res.status(500).json('cannot create wallet' + error.message)
    }
}

export const editWallet = async (req, res) => {
    const { walletId, userId, usdBalance, usdtBalance } = req.query
    try {
        const wallet = await WalletModel.findByPk(walletId);
        if (wallet) {
            const updatedWallet = await wallet.update({ UserId: userId, usdBalance: usdBalance, usdtBalance: usdtBalance })
            return res.status(200).json(updatedWallet)
        }
        else {
            res.status(404).json('Wallet not Found')
        }
    }
    catch (error) {
        return res.status(500).json('cannot edit wallet' + error.message)
    }
}

export const deleteWallet = async (req, res) => {
    const walletId = req.params.id
    try {
        const deleteWallet = await WalletModel.destroy({
            where: {
                id: walletId
            }
        });
        return res.status(200).json('Wallet deleted')
    }
    catch (error) {
        return res.status(500).json('cannot delete wallet' + error.message)
    }
}

export const updateBalance = async (req, res) => {
    const { userId, amount, currency, operation } = req.query
    let amountNb = Number(amount)
    try {
        const wallet = await WalletModel.findOne({ where: { UserId: userId } });
        console.log('here')
        console.log(wallet ? 'yes' : 'no')
        if (wallet) {
            if (operation === 'add') {
                if (currency === 'usd') {
                    const oldAmount = Number(wallet.usdBalance)
                    wallet.usdBalance = oldAmount + amountNb
                    await wallet.save()
                }
                else if (currency === 'usdt') {
                    const oldAmount = Number(wallet.usdtBalance)
                    wallet.usdtBalance = oldAmount + amountNb
                    await wallet.save()
                }
                else {
                    return res.status(404).json('cannot Find Currency' + error.message)
                }
            }
            else if (operation === 'remove') {
                if (currency === 'usd') {
                    const oldAmount = Number(wallet.usdBalance)
                    if (oldAmount >= amountNb) {
                        wallet.usdBalance = oldAmount - amountNb
                        await wallet.save()
                    }
                    else {
                        console.log('insufissant')
                        return res.json({ success: false, message: 'Insuficient Funds' })
                    }
                }
                else if (currency === 'usdt') {
                    const oldAmount = Number(wallet.usdtBalance)
                    if (oldAmount >= amountNb) {
                        wallet.usdtBalance = oldAmount - amountNb
                        await wallet.save()
                    }
                    else {
                        console.log('insufissant')
                        return res.json({ success: false, message: 'Insuficient Funds' })
                    }
                }
               
            }
        } else {
            return res.status(400).json('cannot Find wallet' + error.message)

        }
        const updated = await WalletModel.findOne({ where: { UserId: userId } });
        return res.status(200).json(updated)
    }
    catch (error) {
        return res.status(500).json('cannot update wallet' + error)
    }
}
