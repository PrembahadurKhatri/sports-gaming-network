import User from "../models/register";
import { cloudinaryUpload } from "../utils/cloudinaryUpload";
import bcrypt from "bcrypt";

export const registerUser = async (userData: any, file: any) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already registerd!");
    }
    if (!file) {
        throw new Error("Profile photo is required");
    }

    const uploadResult = await cloudinaryUpload(file.buffer);
    userData.profilePhoto = uploadResult.secure_url;

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    const userResponse = savedUser.toObject();
    delete userResponse.password;
    //delete userResponse ma error aaye yo use gara 
    //const {password,...userWithoutPassword}=userResponse;

    console.log(`New player registered: ${savedUser.email}`);
    return {
        success: true,
        message: "Player registered successfully",
        user: userResponse
        //user:userWithoutPassword
    };

};