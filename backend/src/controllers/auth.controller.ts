import { Request, Response } from "express";
import { registerUser,loginUser} from "../services/auth.service"

export const register = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body,req.file);
        res.status(201).json({  //201 means created
            success: result.success,
            message: result.message,
            user: result.user,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
};
//Login Player
export const login = async(req:Request,res:Response) =>{
    try{
        const result = await loginUser(req.body);
        res.status(200).json({   //200 means ok
            success:result.success,
            message:result.message,
            user:result.user,
            token:result.token,
        });
    }catch(error){
        console.log(error);
        if(error instanceof Error){
            res.status(400).json({
                success:false,
                message:error.message,
            });
        }else{
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
            });
        }
    }
};
