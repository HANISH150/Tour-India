import React from 'react'
import './Home.css'
import CampingImage from './Camping.svg'
import SwiperImages from '../shared/swiper/SwiperImages'
import AboutWebsite from '../AboutWebsite/AboutWebsite'
import {useSelector} from 'react-redux'
function Home() {
  let userTheme = useSelector(state=>state.theme)
  return (
    <>
    <div className="container">
      <div className="row w-100">
        <div className="col-md-6 text-center">
        <img src={CampingImage} alt="image not found" className='mx-auto'  style={{ height: 400,width:300,marginLeft:60}} />
        </div>
        <div className="col-md-6 mt-md-5">
        <div className="container">
            <h1 className={`main-title mt-5 ${userTheme && 'text-light'}`}>GET SET GO!!</h1>
            <br />
            <h3 className={`information-tag + ${userTheme && 'text-light'}`}>Now check some of the top places to visit in INDIA and pack your bags!!</h3>
            </div>
        </div>
      </div>
    </div>
    <SwiperImages/>
    <AboutWebsite/>
    </>
  )
}

export default Home
