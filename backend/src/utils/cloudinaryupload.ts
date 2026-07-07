//npm install streamifier
import cloudinary from "../config/cloudinary";
import {UploadApiResponse} from "cloudinary";
import streamifier from "streamifier";

export const cloudinaryUpload = async(buffer:Buffer) =>{
//return new Promise((resolve,reject)=>{ 
return new Promise<UploadApiResponse>((resolve,reject) => {
    const stream =cloudinary.uploader.upload_stream(
    {
        folder:"sports-gaming-network"
    },
    (error,result)=>{
        if(error || !result){
            return  reject(error || new Error("Upload Failed"));
        }
            resolve(result);
    }
    
);
streamifier
.createReadStream(buffer)
.pipe(stream);
});
}
