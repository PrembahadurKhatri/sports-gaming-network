import express from 'express'
import upload from "../middleware/multer"
import cloudinary from "../config/cloudinary"

const router=express.Router();

router.post("/upload",upload.single("image"),
async(req,res)=>{
    try{
        const result = await new Promise((resolve,reject) => {
            cloudinary.uploader.upload_stream({
                folder:"sports_gaming_network",
            },
        (error,result)=>{
            if(error) reject (error);
        else resolve(result);
        })
        .end(req.file.buffer);//Multer stored the image in RAM
        });
        res.json(result);//You send it back to React.
}catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}
)

export default router;
