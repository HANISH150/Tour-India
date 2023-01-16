import React from 'react'
import './FavouriteCard.css'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import DescriptionModalButton from '../Places/DescriptionModalButton'
import axios from 'axios'
function FavouriteCard(props) {
    let dummyPlace={
        "CITYNAME":"Bandipur National Park",
        "OVERVIEW":"abcdefghijkl",
        "DESTINATIONTYPE":"HISTORY & HERITAGE",
        "STATE":"DELHI",
        "IMAGE":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5J3p79XXo0XS9uRQaZpUJZlEQKD8e1ICEQ&usqp=CAU"
      }
      let userReduxObject = useSelector(state=>state.user)
      let username = userReduxObject.userObj.username
      const RemoveFromFavourites =async (placeData) =>{
        //console.log(placeData)
        let token = localStorage.getItem("token")
        let response = await axios.delete(`http://localhost:4000/places/delete-from-fav/${username}/${placeData.CITYNAME}`,{
          headers:{Authorization:"Bearer "+token}
        })
        let responseMessage = response.data.message
        if(responseMessage==="Removed from favourites!!"){
          alert(responseMessage)
          props.updateFavouritePlaces(response.data.favPlaces,props.id)
        }else{
          alert(responseMessage)
        }
       /*.then((response)=>{
        let responseMsg=response.data.message
        if(responseMsg==="Removed from favourites!!"){
            console.log(responseMsg)
            props.updateFavouritePlaces(response.data.favPlaces,props.id)
        }else{
            console.log(responseMsg)
        }
       }).catch((error)=>{
        console.log("Error occurred in Deleting data!!"+error.message)
       })*/
      }
      let userTheme = useSelector(state=>state.theme)
  return (
    <>
      <div className="fav-card m-2" style={{borderRadius:10}}>
        <div className="p-1">
            <img src={props.favPlace.IMAGE} className='w-100 mt-1 mb-1' style={{borderRadius:10,height:150}} alt="IMAGE NOT FOUND!!" />
        </div>
        <h5 className={`favourite-text text-center pb-2 ${userTheme&&'text-light'}`} >{props.favPlace.CITYNAME}</h5>
        {/* destniation type tag open */}
        <div className='text-center'>
        <p className='favourite-text destination-tag  p-1'style={{borderRadius:50}} >{props.favPlace.DESTINATIONTYPE}</p>
        </div>
        {/* destination type tag closed */}
        <p className={`favourite-text text-center mt-2 ${userTheme&&'text-light'}`} >LOCATED STATE : {props.favPlace.STATE}</p>
        <div className="container text-center p-2">
        <DescriptionModalButton 
        overview={props.favPlace.OVERVIEW} 
        place={props.favPlace.CITYNAME}
        image={props.favPlace.IMAGE}
        />
        <br />
        <Button variant='danger' className='favourite-text mt-1' onClick={()=>{RemoveFromFavourites(props.favPlace)}} >REMOVE</Button>
        </div>
      </div>
    </>
  )
}

export default FavouriteCard
