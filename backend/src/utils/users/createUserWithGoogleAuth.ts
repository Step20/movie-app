import mongoose from "mongoose";
import { UserModel } from "../../models/User";
import { UserSettingsModel } from "../../models/UserSettings";
import generateJWT from "../jwt/generateJWT";



const createUserWithGoogleAuth = async(name:string,email:string)=>{
    const user = new UserModel({
        name,email
    });

    const userSettings = new UserSettingsModel({
        user: user._id, 
    });

    userSettings._id = new mongoose.Types.ObjectId(); 
        await userSettings.save();

    user.userSettings = userSettings;

    const jwt = generateJWT({payload:{user:{
        _id:user._id,
        name:user.name,
        email:user.email
    }}})
    await user.save();

    return {jwt,user};
}

export default createUserWithGoogleAuth;