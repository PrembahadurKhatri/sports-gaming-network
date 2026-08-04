//npm install bcrypt --save
//npm install jsonwebtoken
//npm install -D @types/jsonwebtoken
import User from "../models/register";
import { cloudinaryUpload } from "../utils/cloudinaryupload";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export const registerUser = async (userData: any, file: any) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already registerd!");
    }

    // Accept either an uploaded file (multipart/form-data) or a URL string in the body
    if (file) {
        // Actual file uploaded via Multer → upload to Cloudinary
        const uploadResult = await cloudinaryUpload(file.buffer);
        userData.profilePhoto = uploadResult.secure_url;
    } else if (!userData.profilePhoto) {
        // Neither a file nor a URL was provided
        throw new Error("Profile photo is required");
    }
    // else: userData.profilePhoto already contains the URL from req.body → use it as-is

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    const { password: _password, ...userResponse } = savedUser.toObject();
//_password ma password hunxa ani ...yserResponse ma everything except password for keeping password safe

    console.log(`New player registered: ${savedUser.email}`);
    return {
        success: true,
        message: "Player registered successfully",
        user: userResponse
        //user:userWithoutPassword
    };

};

export const loginUser= async (loginData:any) =>{
    const { email, password } = loginData;
    const existingUser=await User.findOne({email});
    if(!existingUser){
        throw new Error("Invalid username or password!")
    }
    const isPasswordMatch=await bcrypt.compare(password,existingUser.password);
    if(!isPasswordMatch){
        throw new Error("Invalid username or password.")
    }
    const payload={
        userId:existingUser._id,
        userEmail:existingUser.email,
                  role: existingUser.role
    };
   if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
    const secretkey=process.env.JWT_SECRET;
    //Generate a new JWT token 
    const token=jwt.sign(payload,secretkey,{expiresIn:'7d'})


    const {password:_password,...userResponse}=existingUser.toObject();
    return {
        success:true,
        message:"Login Sucessfull",
        user:userResponse,
        token
    }
}
export const getPlayerById = async(id:string) =>{
      const player = await User.findById(id)
        .select("fullname email profilePhoto skillLevel position sport gender age province location bio phoneNumber")
      if (!player) {
        throw new Error("Player  not found.");
      }
      return {
        success: true,
        message: "Player fetched successfully.",
        player,
      };
}

export const searchPlayers = async (query: any) => {
  const filter: any = {};

  if (query.fullname) {
    filter.fullname = { $regex: query.fullname, $options: "i" };
  }
  if (query.sport) {
    filter.sport = query.sport;
  }
  if (query.province) {
    filter.province = query.province;
  }
  if (query.skillLevel) {
    filter.skillLevel = query.skillLevel;
  }
  if (query.position) {
    filter.position = query.position;
  }

  const players = await User.find(filter)
    .select("fullname email profilePhoto skillLevel position sport gender age province location bio")
    .sort({ createdAt: -1 })
    .limit(100);

  return {
    success: true,
    message: "Players fetched successfully.",
    players,
  };
};
//update player
export const updatePlayer = async (
  userId:string,
  userData:any,
  file:any
) => {
const user = await User.findById(userId);

if(!user){ 
throw new Error("Player not found");
}
if(file){
    const uploadResult = await cloudinaryUpload(file.buffer);
    user.profilePhoto = uploadResult.secure_url;
}

user.fullname = userData.fullname || user.fullname;
user.phoneNumber = userData.phoneNumber || user.phoneNumber;
user.location = userData.location || user.location;
user.bio = userData.bio || user.bio;
user.age = userData.age || user.age;
user.gender = userData.gender || user.gender;
user.province = userData.province || user.province;
user.sport = userData.sport || user.sport;
user.position = userData.position || user.position;
user.skillLevel = userData.skillLevel || user.skillLevel;

  const { password, ...userResponse } = user.toObject(); 
  //It means:Take the password property and store it in a variable named password. Put all the remaining properties into userResponse.
await user.save();
  return {
    success: true,
    message: "Profile Updated successfully.",
    user:userResponse,
  };
}

export const deletePlayer = async(id:string) =>{
      const user = await User.findById(id)
      if (!user) {
        throw new Error("Player  not found.");
      }
      await user.deleteOne();
      return {
        success: true,
        message: "Player deleted successfully.",
      };
    }