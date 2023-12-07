import db from '../models/index.js'

import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import { createUserName } from "../utils/userName.js";
import jwt from 'jsonwebtoken';

const {UserModel,WalletModel} = db;

export const signup = async (req,res, next)=>{
    const { email, password, name, role} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const username = createUserName(email);

    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }


    try{
    const newUser = await UserModel.create({
        username,
        email, 
        password: hashedPassword,
        name, 
        role,
    });
    await newUser.save()
    const userWallet=await WalletModel.create({UserId:newUser.id,usdBalance:0.00,usdtBalance:0.00,})
  
        res.status(201).json({message: "user created successfully!"})
    } catch (error) {
        next(error);
    }
}


export const signin = async (req,res, next) =>{
    const {email,password} = req.body;
    try{
        const validUser = await UserModel.findOne({ where: { email } });

    if(!validUser) return next(errorHandler(404, 'Wrong credentials! '));    

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401, 'Wrong password!'));

    const token = jwt.sign({id: validUser.id, role:validUser.role}, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser.dataValues;
    res
        .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now()+ 24*60*60*100)})
        .status(200)
        .json(rest);
    
} catch(error){
        next(error);
    }
};


export const signOut = async(req,res,next)=>{
    try{
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error){
        next(error)
    }
}