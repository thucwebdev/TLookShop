import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req,res) => {
    try {
            
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success : false, message:"Người dùng không tồn tại"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false , message:'Thông tin đăng nhập không hợp lệ'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

// Route for user registration
const registerUser = async (req,res) => {
    try {
        
        const {name , email , password} = req.body;
    
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success : false, message:"Email đã được đăng ký"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success : false, message:"Vui lòng nhập email hợp lệ"})
        }
        if(password.length < 8){
            return res.json({success : false, message:"Vui lòng nhập mật khẩu có ít nhất 8 ký tự"})
        }

        // băm mật khẩu người dùng
        const salt = await bcrypt.genSalt(10)
        const hashedPassword  = await bcrypt.hash(password,salt)
        
        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })

        const user = await newUser.save() 

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:fasle , message:error.message})
    }

}

// Route for admin login
const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false , message : "Thông tin đăng nhập không hợp lệ"})
        }


    } catch (error) {
        console.log(error);
        res.json({success:fasle , message:error.message})
    }
}


export { loginUser , registerUser , adminLogin }