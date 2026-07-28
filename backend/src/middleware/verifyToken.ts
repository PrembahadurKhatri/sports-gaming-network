import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";

export const verifyToken =(req:Request,res:Response,next:NextFunction) =>{
try{
    //Authorization header nikalne
    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"Access denied .No Token provided",
        });
    }

    //"Bearer token " abta token matra nikalne
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Invalid token format",
        });
    }
    //JWT secret check
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined");
    }

    //token verify 
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    //decoded user lai request ma rakhne
    (req as any).user=decoded;
    next();
}catch(error){
    return res.status(401).json({
        success:false,
        message:"Invalid or expired token.",
    });
}
}