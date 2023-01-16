import React from 'react'
import './CardPlaces.css'
import DescriptionModalButton from './DescriptionModalButton'
import Button from 'react-bootstrap/Button';
import {IoStar} from 'react-icons/io5'
import axios from 'axios'
import {useSelector} from 'react-redux'

function CardPlaces(props) {
  let dummyPlace={
    "CITYNAME":"Bandipur National Park",
    "OVERVIEW":"abcdefghijkl",
    "DESTINATIONTYPE":"HISTORY & HERITAGE",
    "STATE":"DELHI",
    "IMAGE":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5J3p79XXo0XS9uRQaZpUJZlEQKD8e1ICEQ&usqp=CAU"
  }
  let userReduxObj = useSelector(state=>state.user)
  let username = userReduxObj.userObj.username
  const onClickFavourite = async(placeData)=>{
    let token = localStorage.getItem("token")
    let placeObject = {
      "username":username,
      "place":[placeData]
    }
    let response = await axios.post('http://localhost:4000/places/add-to-fav',placeObject,{
      headers:{Authorization:"Bearer "+token}
    })

    let responseMessage = response.data.message
    if(responseMessage==="Added to favourites"){
      alert(responseMessage)
      console.log(responseMessage)
    }else{
      alert(responseMessage)
      console.log(responseMessage)
    }

    // .then((response)=>{
    //   let responseMessage=response.data.message
    //   if(responseMessage==="Added to favourites"){
    //     console.log(responseMessage)
    //   }else if(responseMessage==="Already added to favourites"){
    //     console.log(responseMessage)
    //   }
    // }).catch((error)=>{
    //   console.log("Error occurred in adding to favourites!!"+error);
    // })
  }

  let userTheme = useSelector(state=>state.theme)

  return (
    <>
      <div style={{borderRadius:10}} className='outer-card m-2 p-1' >
        <img className='place-text w-100' style={{borderRadius:10,height:150}} src={props.place.IMAGE} alt="IMAGE NOT FOUND!!" />
        <h5 className={`place-text text-center mt-2 ${userTheme&&'text-light'}`}>{props.place.CITYNAME}</h5>
        {/* destniation type tag open */}
        <div className='text-center'>
        <p className='place-text destination-tag  p-1'style={{borderRadius:50}} >{props.place.DESTINATIONTYPE}</p>
        </div>
        {/* destination type tag closed */}
        <p className={`place-text text-center mt-2 ${userTheme&&'text-light'}`} >LOCATED STATE : {props.place.STATE}</p>
        <div className="container text-center p-2">
        <DescriptionModalButton 
        overview={props.place.OVERVIEW} 
        place={props.place.CITYNAME}
        image={props.place.IMAGE}
        />
        {/* add to favouites button */}
        <Button variant="danger" type='submit' className='ms-2' onClick={()=>onClickFavourite(props.place)}><IoStar/></Button>
        </div>
      </div>
    </>
  )
}

export default CardPlaces
