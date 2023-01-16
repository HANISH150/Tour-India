import React from 'react'
import {useForm} from 'react-hook-form'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './SignupComponent.css'
function SignupComponent() {

    const {register,handleSubmit,formState:{errors}} = useForm()

    const navigate = useNavigate()

    const onFormSubmit = (signupData) =>{
        axios.post("http://localhost:4000/user-auth/signup",signupData)
        .then((response)=>{
          let responseMsg= response.data.message
          console.log(responseMsg)
          navigate('/login')
        }).catch((error)=>{
          console.log("Error in user signup!!"+error.message)
        })
    }

    let userTheme = useSelector(state=>state.theme)

  return (
    <div>
      <h3 className={`signup-text ${userTheme&&'text-light'}`}>SIGNUP</h3>
      {/* signup form */}
      <Form className='w-75 mx-auto' onSubmit={handleSubmit(onFormSubmit)} >
        {/* username */}
        <Form.Group className='mt-3'>
            <Form.Label className={`signup-text ${userTheme&&'text-light'}`}>UserName</Form.Label>
            <Form.Control type="text" placeholder='Enter your username' {...register("username",{required:true})} />
            {errors.username && <p className='signup-text text-danger'>*UserName is required</p> }
        </Form.Group>
        {/* emialID */}
        <Form.Group className='mt-3'>
            <Form.Label className={`signup-text ${userTheme&&'text-light'}`}>Email ID</Form.Label>
            <Form.Control type="email" placeholder='Enter your Email' {...register("email",{required:true})} />
            {errors.email && <p className='signup-text text-danger'>*Email ID is required</p> }
        </Form.Group>
        {/* password */}
        <Form.Group className='mt-3'>
            <Form.Label className={`signup-text ${userTheme&&'text-light'}`}>Password</Form.Label>
            <Form.Control type="password" placeholder='Enter password' {...register("password",{required:true})} />
            {errors.password && <p className='signup-text text-danger'>*Password is required</p> }
        </Form.Group>

        {/* login button */}
        <Button className='signup-text login-button w-75 mt-4' variant={userTheme?'outline-light':'outline-dark'} type='submit' >SIGNUP</Button>
      </Form>
    </div>
  )
}

export default SignupComponent
