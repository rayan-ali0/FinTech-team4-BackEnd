import db from '../models/index.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import fs from 'fs'

const {UserModel} = db;

export const test = (req, res)=>{
    res.json({
        message: "hello fuad :)"
    });
};

export const updateUser = async (req,res, next) =>{
    // if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"));
    const userId = req.params.id;
    

    try{

        const user = await UserModel.findByPk(userId);

        if (!user) {
            return next(errorHandler(403, 'Access Denied!'))
          }

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }


          user.username = req.body.username || user.username;
          user.email = req.body.email || user.email;
          user.name = req.body.name || user.name;
          user.password = req.body.password || user.password;
      
          await user.save();

        const {password, ...rest} = user.dataValues;
        res.status(200).json(rest);

    } catch (error){
        next(error)
    }
};


export const updateUserPic = async (req,res, next) =>{
    // if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own profile!"));
    
    try{

    const userId = req.params.id;
    const user = await UserModel.findByPk(userId);

    if (!user) {
        return next(errorHandler(403, 'Access Denied!'))
    }   

    const newImage = req.file;
    const oldImagePath = user.pic;

    console.log("");
    console.log(oldImagePath);
    console.log("");



    if(!newImage){
        return errorHandler(400, "Error Uploading Image");
    }     

     user.pic = newImage.path ;

    if(oldImagePath !== null && fs.existsSync(oldImagePath) && oldImagePath !== 'images/default.jpg'){
        fs.unlink(oldImagePath, (err)=>{
            if(err) throw err;
        })
    }
    
    await user.save();

    const {password, pic, ...rest} = user.dataValues;
    res.status(200).json(pic);

    } catch (error){
        next(error)
    }
};

export const deleteUser = async (req,res) =>{
    // if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your account!'));
    const userId = req.params.id;
    

    try{
        const user = await UserModel.findByPk(userId);
    if(!user){
        return res.status(400).send('The user with the given ID was not found');
    }
    
        await user.destroy();
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted successfully!')
    } catch (error) {
        next(error);
    }
};