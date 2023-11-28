import jwt from 'jsonwebtoken';
import { errorHandler }  from './error.js';

export const verifyUserType = (req,res,next,roles)=>{
    // const token = req.headers.authorization?.split(" ")[1];
    // const role = req.cookies.access_token.role;
    // if(!token) {
    //     return next(errorHandler(401, 'Unauthorized'),);  
    // }
    const role = req.role;




    // if(data.role !== "admin"){
    //     return next(errorHandler(401, 'Unauthorized'));
    // }
   return next()
}