import React from 'react'
import SideImage from '../shared/SideImage'
import SwiperImages from '../shared/swiper/SwiperImages'
import SignupComponent from './SignupComponent'

function Signup() {
  return (
    <>
    <div className="container">
    <div className="row text-center mx-auto mt-4 mb-4 w-100">
      <div className="col-md-6">
      <SideImage/>
      </div>
      <div className="container col-md-6">
        <SignupComponent/>
      </div>
    </div>
    </div>
    <SwiperImages/>
    </>
  )
}

export default Signup
