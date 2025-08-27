const app=require('express');
const server=app();
const cors=require('cors');
const connectodb=require('./connections/db');
const cookieparser=require('cookie-parser');
const authrouter=require('./Routes/authroutes');


server.use(app.json());
server.use(app.urlencoded({extended:true}));
server.use(cors());
server.use(cookieparser());

connectodb();
server.use('/auth',authrouter);

module.exports=server;
