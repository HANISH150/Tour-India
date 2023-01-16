import React from 'react'
import './NewPlaceComponent.css'
import {Link} from 'react-router-dom'
function NewPlaceComponent() {
  return (
    <>
        <Link to="/newplace" style={{ textDecoration: 'none' ,color:"black"}}>
        <div className="container">
        <div className="newplace-card col-11 mx-auto m-5 p-4">
            <h6>CLICK HERE TO ADD A NEW PLACE THAT'S MISSING...</h6>
        </div>
        </div>
        </Link>
    </>
  )
}

export default NewPlaceComponent
