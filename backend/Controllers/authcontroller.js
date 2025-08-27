const users=require('../models/users');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const signup = async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username){
            return res.status(400).json({error:"username is required."});
        }
        const existinguser= await users.findOne({emailid:email});
        if(existinguser){
            return res.status(400).json({error:"User already exists with this email."});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        let user = await users.create({username:username,emailid:email,password:hashedpassword});
        const token=jwt.sign({id:user._id,email:user.emailid,password:user.password,username:user.username},process.env.SECRET_KEY);
        res.cookie("token",token,{
            httpOnly:true,
            domain:"vercel.app",
            secure:true,
            sameSite:"Strict",
            maxAge:12*365*24*60*60*1000,
            expires:new Date(Date.now()+12*365*24*60*60*1000)
        });
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            maxAge:12*365*24*60*60*1000,
            expires:new Date(Date.now()+12*365*24*60*60*1000)
        });
        res.cookie("token",token,{
            httpOnly:true,
            domain:"netlify.app",
            secure:true,
            sameSite:"Strict",
            maxAge:12*365*24*60*60*1000,
            expires:new Date(Date.now()+12*365*24*60*60*1000)
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Internal server error."});
    }
}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existinguser= await users.findOne({emailid:email});
        if(!existinguser){
            return res.status(400).json({error:"User doesn't exist with this email."});
        }
        const check= await bcrypt.compare(password,existinguser.password);
        if(!check){
            return res.status(400).json({error:"Incorrect Password."});
        }
        const token=jwt.sign({id:existinguser._id,email:existinguser.emailid,password:existinguser.password,username:existinguser.username},process.env.SECRET_KEY);
        res.cookie("token",token,{
            httpOnly:true,
            domain:"vercel.app",
            sameSite:"Strict",
            secure:true,
            maxAge:12*365*24*60*60*1000,
            expires:new Date(Date.now()+12*365*24*60*60*1000)
        });
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"Strict",
            expires:new Date(Date.now()+12*365*24*60*60*1000),
            maxAge:12*365*24*60*60*1000
        });
        res.cookie("token",token,{
            httpOnly:true,
            domain:"netlify.app",
            secure:true,
            sameSite:"Strict",
            maxAge:12*365*24*60*60*1000,
            expires:new Date(Date.now()+12*365*24*60*60*1000)
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal server error."});
    }
}

const getuser = async (req,res)=>{
    try{
        const user= req.body.user;
        if(!user){
            return res.status(401).json({error:"Unauthorized access."});
        }
        return res.status(200).json({user:user});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal server error."});
    }
}

module.exports={signup,login,getuser};
