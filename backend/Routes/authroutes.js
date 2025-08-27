const {signup,login,getuser:userdetails}=require('../Controllers/authcontroller');
const protected=require('../Middlewares/authmiddleware');
const server=require('express').Router();

server.post('/signup',signup);
server.post('/login',login);
server.get('/getuser',protected,userdetails);

module.exports=server;
