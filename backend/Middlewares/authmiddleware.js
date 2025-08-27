const jwt=require('jsonwebtoken');
const users=require('../models/users');

const protected= async (req,res,err,next)=>{
    try{
        const token=req.cookies?.token;
        if(!token){
            return res.status(401).json({error:"Unauthorized access."});
        }
        const decodetoken= jwt.verify(token,process.env.JWT_SECRET);
        req.body.user = await users.findById(decodetoken.id);
        next();
    }catch(err){
        console.error(err);
        return res.status(500).json({error:err.message});
    }
}

module.exports=protected;
