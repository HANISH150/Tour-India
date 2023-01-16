const jwt = require('jsonwebtoken')
require("dotenv").config

//writing a middleware to verify token
const verifyToken = (request,response,next) =>{
    //get bearer token
    let bearerToken = request.headers.authorization
    //console.log(request)
    //checking if token exists or not
    if(bearerToken===undefined){
        response.send({message:"Unauthorized token!!"})
    }
    //if token exists
    //lets extract token
    let token = bearerToken.split(" ")[1]
    //using a try catch block to verify token as 'verify' of jsonwebtoken can throw an error
    try{
        //verifying token using jsonwebtoken
        jwt.verify(token,process.env.TOKEN_KEY)
        //forwarding request to called private route
        next()
    }catch(error){
        response.send({message:"Session expired!! ReLogin to continue!!"})
    }
}

module.exports = verifyToken