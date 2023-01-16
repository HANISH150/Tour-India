const { response, request } = require('express')
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const router = express.Router()
router.use(express.json())

router.post('/signup',expressAsyncHandler(
    async(request,response)=>{
        let userData = request.body
        let usersinfo = request.app.get('usersinfo')
        let statusOfUser = await usersinfo.findOne({username:userData.username})
        if(statusOfUser!==null){//if user already exists with same username
            response.send({message:"User Already exists!! Choose another UserName"})
        }else{
            let hashedPassword = await bcryptjs.hash(userData.password,10)
            userData.password = hashedPassword
            await usersinfo.insertOne(userData)
            response.send({message:"Signup successful!! New user created"})
        }
    }
))

router.post('/login',expressAsyncHandler(
    async(request,response)=>{
       // console.log("routecalled!!")
        let userLoginData = request.body
        let usersinfo = request.app.get('usersinfo')
        let userDataInDB = await usersinfo.findOne({username:userLoginData.username})
        if(userDataInDB===null){
            response.send({message:"Invalid UserName!!"})
            //console.log("Invalid UserName!!")
        }else{
            let passwordMatching = await bcryptjs.compare(userLoginData.password,userDataInDB.password);
            if(passwordMatching===false){
                response.send({message:"Incorrect Password!!"})
                //console.log("Incorrect Password!!")
            }else{
                //creating jwt tokens
                //login successful
                let token = jwt.sign({username:userDataInDB},process.env.TOKEN_KEY,{expiresIn:12*60*60})
               // console.log(token,userDataInDB)
                response.send({message:"Login Successful!!",token:token,userInfo:userDataInDB})
                //console.log("Login Successful!!")
            }
        }
    }
))

module.exports = router