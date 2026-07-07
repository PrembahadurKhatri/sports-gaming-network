import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
             match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },

        phoneNumber: {
            type: String,
            required: true,
            minlength:10,
            maxlength:15
        },

        password: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        bio: {
            type: String,
            default: "",
        },

        age: {
            type: Number,
            required: true,
            min:13
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },

        profilePhoto: {
            type: String,
            required: true,
        },

        sport: {
            type: String,
            enum: [
                "Cricket",
                "Football",
                "Volleyball",
                "Handball",
                "Basketball",
                "Hockey",
                "Tennis",
                "Badminton",
                "Futsal",
                "Kabaddi",
            ],
            required: true,
        },
        position: {
            type: String,
            required: true
        },
        skillLevel: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced",
                "Professional",
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;