const mongoose=require('mongoose');

const connectiondb=mongoose.connect(process.env.MONGO_URI).then((connection)=>{
    console.log("Database connection successful!");
}).catch((err)=>{
    console.error(err);
});

module.exports=connectiondb;
