import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloudinary_ame=process.env.CLOUDINARY_CLOUD_NAME;
    api_key:process.env.CLOUDINARY_API_KEY;
    api_secret:process.env.CLOUDINARY_API_SECRET_;
})