import React from 'react'
import './Favourites.css'
import axios from 'axios'
import NoData from './NoData.svg'
import {useState,useEffect} from 'react'
import FavouriteCard from './FavouriteCard'
import {useSelector} from 'react-redux'
function Favourites() {
  let [FavouritePlaces,setFavouritePlaces] = useState([])
  useEffect(()=>{
    gettingFavourites()
  },[])

  let userReduxObject = useSelector(state=>state.user)
  let username = userReduxObject.userObj.username
  const gettingFavourites =async ()=>{
    let token = localStorage.getItem("token")
    let response = await axios.get(`http://localhost:4000/places/get-favourites/${username}`,{
      headers:{Authorization:"Bearer "+token}
    })
    let responseMessage = response.data.message
    if(responseMessage==="success"){
      let favPlaces = response.data.places;
      setFavouritePlaces(favPlaces)
    }else{
      alert(responseMessage)
    }

    // .then((response)=>{
    //   let favPlaces = response.data.places;
    //   setFavouritePlaces(favPlaces)
    // }).catch((error)=>{
    //   console.log("Error occurred in getting favourite places"+error.message)
    // })
  }

  useEffect(()=>{
    updateFavouritePlaces()
  },[])

  const updateFavouritePlaces = (data,id)=>{
    let copiedFavPlaces = [...FavouritePlaces]
    copiedFavPlaces.splice(id,1);
    setFavouritePlaces(copiedFavPlaces)
    //console.log(dataNew)
  }

  let dummyArray = [1,2,3,4]
  let userTheme = useSelector(state=>state.theme)
  return (
    <>
      <div className="favourite-title container d-flex mx-auto col-11 col-md-8 p-2 m-3 justify-content-center">
        <h2 className={`fav-text m-3 ${userTheme&&'text-light'}`}>FAVOURITES!!</h2>
      </div>
      { 
      FavouritePlaces===undefined || FavouritePlaces.length===0  ?
        <div className="container col-11 col-md-8 mb-5 mt-5" >
        
        <div className="container">
          <img src={NoData} style={{height:230}} 
          className='d-flex m-auto mt-5 mb-3'
          alt="" />
        </div>
        <h2 className='fav-text text-center text-danger m-5'>FAVOURITES IS EMPTY!!</h2>
        </div>: 
        <div className="container col-11 mb-4 pt-3 pb-3" >
          <div className="row">
            {
            FavouritePlaces.map((data,id)=>
            <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <FavouriteCard  favPlace={data} updateFavouritePlaces={updateFavouritePlaces} id={id} />
            </div>
            )
          }
          </div>
        </div>
      }
    </>
  )
}

export default Favourites
