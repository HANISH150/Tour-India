const express = require('express')
const app = express()

//to access dot env variables
require('dotenv').config()

const  mclient = require('mongodb').MongoClient;

//importing path module
const path=require('path')
//connecting build of application to nodejs
app.use(express.static(path.join(__dirname,'../build')))


//connecting to placeRoutes
const placesRoutes = require('./routes/placeRoutes')
app.use('/places',placesRoutes)
//connecing to userRoutes
const userRoutes = require('./routes/userRoutes')
app.use('/user-auth',userRoutes)


//dealing with page refresh
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'../build/index.html'));
})


//connecting to database
const url = process.env.DBUrl
mclient.connect(url)
.then((client)=>{
    console.log("Connnected to database!!")
    let PlacesDB = client.db("PlacesDB")

    let placesinfo = PlacesDB.collection("placesinfo")
    app.set("placesinfo",placesinfo)
    
    let favourites = PlacesDB.collection("favourites")
    app.set("favourites",favourites)

    let usersinfo = PlacesDB.collection("usersinfo")
    app.set("usersinfo",usersinfo)
}).catch((error)=>{
    console.log("Error in database connection!!" + error.message)
})



app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})