import React from 'react'
import SideImage from '../shared/SideImage'
import SwiperImages from '../shared/swiper/SwiperImages'
import LoginComponent from './LoginComponent'

function Login() {
  return (
    <>
    <div className="container">
    <div className="row text-center mt-4 w-100 mx-auto">
      <div className="col-md-6">
      <SideImage/>
      </div>
      <div className="col-md-6">
        <LoginComponent/>
      </div>
    </div>
    </div>
    <SwiperImages/>
    </>
  )
}

export default Login
