import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({

    firstName :{
        type: String,
        requried: true,
        minLength: [3,"First Name must contain at least 3 Characters!"],
    },
    lastName: {
        type: String,
        requried: true,
        minLength: [3,"Last Name must contain at least 3 Characters!"],
    },
    email: {
        type: String,
        requried: true,
        validate: [validator.isEmail, "Please Provide a Valid Email!"],
    },
    phone: {
        type: String,
        requried: true,
        minLength: [10,"Phone Number must contain at least 10 Characters!"],
        maxLength: [10,"Phone Number must contain at least 10 Characters!"],
    },
    message: {
        type: String,
        requried: true,
        minLength: [10, "Message must contain at least 10 Characters!"],
    },
});
 export const Message = mongoose.model("Message", messageSchema);