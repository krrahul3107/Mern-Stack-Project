import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) =>{
    const {firstName, lastName, email, phone, dob, nic, password, gender, role} = req.body;
    if(!firstName || !lastName || !email || !phone || !dob || !nic || !password || !gender || !role){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("Already Registered!", 400));
    }
    user = await User.create({
        firstName, lastName, email, phone, dob, nic, password, gender, role,
    });
    generateToken(user, "User Registered", 200, res);
    res.status(200).json({
        success: true,
        message: "user registered!",
    });
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    // Check for all required fields
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide all details!", 400));
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and ConfirmPassword do not match!", 400));
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        console.log(`User with email ${email} not found`); // Debug statement
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    // Compare passwords
    const isPasswordMatched = await user.comparePassword(password);
    if (isPasswordMatched) {
        console.log(`Password mismatch for user ${email}`); // Debug statement
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    // Check if the role matches
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found!", 400));
    }

    // Generate token and login user
    generateToken(user, "User Login Successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req, res, next) =>{
    const {firstName, lastName, email, phone, dob, nic, password, gender} = req.body;
    if(!firstName || !lastName || !email || !phone || !dob || !nic || !password || !gender){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} With this email Already registered!`));
    }
    const admin = await User.create({
        firstName, lastName, email, phone, dob, nic, password, gender, role: "Admin"
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered!",
    });
});

export const getAllDoctors = catchAsyncErrors( async(req, res, next) =>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async(req, res, next) =>{
    const user  = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).cookie("adminToken", "",{
        httpOnly: true,
        expires: new Date(Date.now()), 
    }).json({
        success: true,
        message: "User Log out Successfully!",
    });
});

export const logoutPatient = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).cookie("patientToken", "",{
        httpOnly: true,
        expires: new Date(Date.now()), 
    }).json({
        success: true,
        message: "User Log out Successfully!",
    });
});

export const addNewDoctor = catchAsyncErrors(async(req, res, next) =>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format not Supported!", 400));
    }
    const {firstName, lastName, email, phone, dob, nic, password, gender, doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !dob || !nic || !password || !gender || !doctorDepartment){
        return next(new ErrorHandler("Please Provide Full Detail", 400));
    }
    const isRegistered = await User.findOne({ email });
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
    }
    const doctor = await User.create({
        firstName, lastName, email, phone, dob, nic, password, gender, doctorDepartment, role:"Doctor", docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          },
        });
        res.status(200).json({
          success: true,
          message: "New Doctor Registered",
          doctor,
    })
});


