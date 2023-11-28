import jwt, { decode } from 'jsonwebtoken';
import { errorHandler }  from './error.js';

export const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
  

   
    if(!token) {
        return errorHandler(401, 'No provided token');  
    }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   if(!decoded){
    return errorHandler(401, 'Unauthorized');  

   }
   req.userId = decoded.userId
   req.role = decoded.role
next()}


export const verifyRole = (array)=>{
    return (req,res,next)=>{
        if(array.includes(req.role)){
            next();
        }
        else {
            return errorHandler(403,'You are not authorized!');
        }
    }
}
   

