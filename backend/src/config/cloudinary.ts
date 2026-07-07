/*
npm install cloudinary
*/
import {v2 as cloudinary} from 'cloudinary';

//Config = Configuration = Setup  कुनै पनि library प्रयोग गर्नुअघि त्यसलाई आवश्यक settings दिने काम हो।
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;