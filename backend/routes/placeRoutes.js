const { response, request } = require('express')
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()
const verifyToken = require('./middleware/verifyToken')

router.use(express.json())

//GETTING ALL PLACES THAT ARE EXISTING IN THE DATABASE
router.get('/all-places',verifyToken,expressAsyncHandler(
    async(request,response)=>{
        let placesInformation =  request.app.get("placesinfo")
        let placearray = await placesInformation.find().toArray()
        if(placearray.length===0){
            response.send({message:"Failed to load data from data base!!"})
        }else{
            response.send({message:"success",places:placearray})
        }
    }
))

//getting favourites places
// router.get('/get-favourites',expressAsyncHandler(
//     async(request,response)=>{
//         let favourites = request.app.get("favourites")
//         let favPlaces = await favourites.find().toArray()
//         if(favPlaces.length===0){
//             response.send({message:"No places added to favourites!!"})
//         }else{
//             response.send({message:"success",places:favPlaces})
//         }
//     }
// ))
router.get('/get-favourites/:username',verifyToken,expressAsyncHandler(
    async(request,response)=>{
        let userName = request.params.username
        let favourites = request.app.get("favourites")
        let favouritesObject = await favourites.findOne({username:userName})
        let favPlaces = favouritesObject.place
        if(favPlaces.length === 0){
            response.send({message:"No places added to favourites!!"})
        }else{
            response.send({message:"success",places:favPlaces})
        }
    }
))


//adding place to favourites
// router.post('/add-to-fav',expressAsyncHandler(
//     async(request,response)=>{
//         let data=request.body;
//         let favourites = request.app.get("favourites")
//         let isPresent = await favourites.findOne({CITYNAME:data.CITYNAME})
//         if(isPresent==null){
//             await favourites.insertOne(data)
//             response.send({message:"Added to favourites"})
//         }else{
//             response.send({message:"Already added to favourites"})
//         }
    
//     }
// ))
router.post('/add-to-fav',verifyToken,expressAsyncHandler(
    async(request,response)=>{
        let data = request.body
        let favourites=request.app.get("favourites")
        let isPresent = await favourites.findOne({username:data.username})
        if(isPresent===null){
            await favourites.insertOne(data)
            response.send({message:"Added to favourites"})
        }else{
            let places=isPresent.place
            let newPlace = data.place[0]
            let doesPlaceExists = places.find(element=>element.CITYNAME===newPlace.CITYNAME)
            if(doesPlaceExists===undefined){
                places.push(data.place[0])
                await favourites.updateOne({username:data.username},{$set:{place:places}})
                response.send({message:"Added to favourites!!"})
            }else{
                response.send({message:"Already added to favourites!!"})
            }
        }
    }
))

//removing place from favourites
// router.delete('/delete-from-fav/:place',verifyToken,expressAsyncHandler(
//     async(request,response)=>{
//         let placeName = request.params.place;
//         //console.log(placeName)
//         let favourites = request.app.get("favourites")
//         let placeDeleted = await favourites.deleteMany({CITYNAME:placeName})
//         //response.send({message:placeDeleted})
//         if(placeDeleted.deletedCount>0){
//             let favPlaces = await favourites.find().toArray()
//             response.send({message:"Removed from favourites!!",favPlaces:favPlaces})
//         }else if(placeDeleted.deletedCount===0){
//             response.send({message:"Nothing to remove from favourites"})
//         }
//     }
// ))
router.delete('/delete-from-fav/:username/:place',verifyToken,expressAsyncHandler(
    async(request,response)=>{
        let userName = request.params.username
        let placeName = request.params.place
        let favourites = request.app.get('favourites')
        let placeObject = await favourites.findOne({username:userName})
        let placearray =  placeObject.place
        let newPlacesArray = placearray.filter((item)=>item.CITYNAME!=placeName)
        await favourites.updateOne({username:userName},{$set:{place:newPlacesArray}})
        response.send({message:"Removed from favourites!!",favPlaces:newPlacesArray})
    }
))

//adding new place to existing places
router.post('/add-new-place',verifyToken,expressAsyncHandler(
    async(request,response)=>{
        let placesinfo = request.app.get("placesinfo")
        let placeData = request.body; 
        let isPresent = await placesinfo.findOne({CITYNAME:placeData.CITYNAME})
        if(isPresent==null){
            await placesinfo.insertOne(placeData).then(()=>{
                response.send({message:"New place added"})
            }).catch((error)=>{
                response.send({message:"Error in adding new place!!",error:error.message})
            })
        }else{
            response.send({message:"Given place already exists"})
        }
    }
))

module.exports = router