import React from 'react'
import './ExistingPlaces.css'
import CardPlaces from './CardPlaces'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Loading from './Loading'
import {useSelector} from 'react-redux'

function ExistingPlaces() {
  let array=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

  let [touristPlaces,setTouristPlaces] = useState([])

  useEffect(()=>{
    getPlacesInformation();
  },[])

  const getPlacesInformation = async() =>{
    let token = localStorage.getItem("token");
    let response = await axios.get('http://localhost:4000/places/all-places',{
      headers:{Authorization:"Bearer "+token}
    })
    let responseMessage = response.data.message
    if(responseMessage==='success'){
      let placesArray = response.data.places
      setTouristPlaces(placesArray)
    }else{
      alert(responseMessage)
    }
    /*.then((response)=>{
      let reponseMessage = response.data.message
      if(reponseMessage==='Unauthorized token!!'){
        alert(reponseMessage)
      }else{
        let placesArray = response.data.places
        setTouristPlaces(placesArray)
      }
      
    }).catch((error)=>{
      console.log("Error occurred in getting all places!!"+error.message)
    })*/
  }
  let loading=[1,2,3,4,5,6,7,8]
  let userTheme = useSelector(state=>state.theme)
  return (
    <>
      <div className="existing-places-card container col-11 mb-4 pt-3 pb-3"  >
        <div className={`card-text h6 text-center m-3 ${userTheme&&'text-light'}`}>PLACES</div>
        <div className="container">
          {
            touristPlaces.length===0 ?
            <div className="row">
              {
                loading.map((data,id)=>
                <div key={id} className="col-12 col-sm-6 col-md-5 col-lg-3">
                  <Loading/>
                </div>
                )
              }
            </div>
            :
            <div className="row">
                {
                  touristPlaces.map((data,id)=>
                    <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3 mx-auto"><CardPlaces
                     place={data}
                    /></div>
                  )
                }
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default ExistingPlaces
